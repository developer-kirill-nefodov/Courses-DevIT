// npx ts-node ./test.ts encode -p password -s salt ./node_modules ./file


const {createCipheriv, createDecipheriv, createHash,scryptSync, createCipher, createDecipher} = require('crypto')
const fs = require('fs')
const path = require('path')
const {pipeline} = require('stream')

type Argv = {options: {[key: string]: string}, args: string[]}
type Task = {
    pass: string,
    salt: string,
    action: 'encode' | 'decode',
    from: string,
    to: string
}
type FileMeta = [string, number, number]

const argv = parseArgs(process.argv);
const task = fillTask(argv);

console.log(task);

switch (task.action){
    case 'encode':
        encode(task);
        break;
    case 'decode':
        decode(task);
        break;
}

function parseArgs(args: string[]) {
    let data: Argv = {
        options: {},
        args: []
    }

  let lastOption: string | null = null;

  args = args.map(s => s.trim()).filter(s => !!s)

  for(const arg of args) {
      if(arg.indexOf('-') === 0) {
          lastOption = arg.slice(1);
          data.options[lastOption] = ''
      } else {
          if(lastOption !== null) {
              data.options[lastOption] = arg
              lastOption = null;
          } else {
              data.args.push(arg)
          }
      }
  }

  return data
}

function loadSalt(salt: string): string {
    try {
        return createHash('md5').update(
            fs.readFileSync(path.join(__dirname, salt)).toString('utf8')
        ).digest('hex').slice(0, 16)
    } catch (e) {
        return createHash('md5').update(salt).digest('hex').slice(0, 16)
    }
}

function fillTask(argv: Argv): Task {

  if(argv.args.length < 5) {
      throw new Error('Arguments length is incorrect')
  }

  switch (argv.args[2]) {
      case "encode":
          return {
              pass: createHash('md5').update(argv.options.p || 'pass').digest('hex'),
              salt: loadSalt(argv.options.s || 'salt'),
              action: 'encode',
              from: argv.args[3],
              to: argv.args[4]
          }
      case "decode":
          return {
              pass: createHash('md5').update(argv.options.p || 'pass').digest('hex'),
              salt: loadSalt(argv.options.s || 'salt'),
              action: 'decode',
              from: argv.args[3],
              to: argv.args[4]
          }
      default:
          throw new Error('Wrong action')
  }
}

function fileList(dir: string): string[] {
    let results: string[] = [];

  fs.readdirSync(dir).forEach(function(file: string) {
      file = path.join(dir, file);
      let stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
          results = results.concat(fileList(file));
      } else {
          results.push(file);
      }
  });

  return results;
}

function checkEncodeInput(input: string): 'file' | 'dir' {
    try {
        return fs.statSync(input).isDirectory() ? 'dir' : 'file'
    } catch (e) {
        throw new Error(`Wrong input: ${input}`)
    }
}

function createOutputFile(output: string) {
    try {
        fs.closeSync(fs.openSync(output, 'w'))
    } catch (e) {
        throw new Error(`Cannot create output file: ${output}`)
    }
}

function checkOutDir(outDir: string) {
    if(!fs.existsSync(outDir)){
        fs.mkdirSync(outDir, { recursive: true });
    }
}

function folderToFile(files: FileMeta[], output: string, offset: number = 0): void {
    if(files.length !== offset) {
        files[offset][1] = fs.statSync(output).size
        pipeline([
            fs.createReadStream(files[offset][0]),
            fs.createWriteStream(output, {flags: 'a'})
        ], () => {
            files[offset][2] = fs.statSync(output).size
            folderToFile(files, output, ++offset)
        })
    } else {
        const fds = fs.openSync(output, 'a')
        fs.writeSync(fds, '\nMETA\n')
        for (const file of files) {
            fs.writeSync(fds, file.join(',') + '\n')
        }
        fs.closeSync(fds);
    }
}

function fileToFolders(input: string, outDir: string) {
    const files = readFileMeta(input)

  function saveFiles(files: FileMeta[], offset: number = 0): void {
      if(files.length === offset) {
          return;
      }
      const normalizedPath = normalizeResultPath(files[offset][0], outDir)
      checkOutDir(path.dirname(normalizedPath))
      const end = files[offset][1] !== files[offset][2] ? files[offset][2] - 1 : files[offset][2]
      pipeline([
          fs.createReadStream(input, {start: files[offset][1], end}),
          fs.createWriteStream(normalizedPath, {flags: 'w'})
      ], () => {
          saveFiles(files, ++offset)
      })
  }

  saveFiles(files, 0);

  console.log(files);
}

function normalizeResultPath(file: string, outDir: string) {
    return path.join(outDir, file.replace('..', '.'))
}

function readFileMeta(file: string): FileMeta[] {
    const size = fs.statSync(file).size
    const fds = fs.openSync(file, 'r')
    let buffer = Buffer.alloc(100)
    let offset = size - buffer.length

  fs.readSync(fds, buffer, {position: offset})
    const str = buffer.toString('utf-8')
    const lastDataIndex = parseInt(str.slice(str.lastIndexOf(',') + 1))

  if(isNaN(lastDataIndex)) {
      throw new Error('Wrong input file')
  }

  buffer = Buffer.alloc(size - lastDataIndex - 7)

  fs.readSync(fds, buffer, {position: lastDataIndex + 6})

  return buffer.toString()
      .split('\n')
      .map(s => s.split(','))
      .map(([file, start, end]) => [file, parseInt(start), parseInt(end)])
}

async function cryptFile(task: Task): Promise<void> {
    const key = scryptSync(task.pass, task.salt, 32);


  const CIPHER_KEY = new Buffer('12345678901234567890123456789012');

// Defininf iv
    const iv = Buffer.alloc(16, 0);
    return new Promise((resolve, reject) => {

    fs.createReadStream(task.to).pipe(
        createCipheriv('aes-256-cbc', CIPHER_KEY, iv)
    ).pipe(
        fs.createWriteStream(task.to + '.enc')
    ).on('finish', () => {})
        pipeline([
            createCipheriv('aes-256-cbc', CIPHER_KEY, iv),
            fs.createWriteStream(task.to + '.enc')
        ], () => {
            // pipeline([
            //   fs.createReadStream(task.to + '.enc'),
            //   fs.createWriteStream(task.to)
            // ], () => {
            //   fs.unlinkSync(task.to + '.enc')
            //   resolve()
            // })
            resolve();
        })
    })
}

async function deCryptFile(task: Task): Promise<void> {
    return new Promise((resolve, reject) => {
        pipeline([
            fs.createReadStream(task.to + '.enc'),
            createDecipheriv('aes-256-cbc', task.pass, task.salt),
            fs.createWriteStream(task.to + '.dec')
        ], () => {
            // pipeline([
            //   fs.createReadStream(task.to + '.enc'),
            //   fs.createWriteStream(task.to)
            // ], () => {
            //   fs.unlinkSync(task.to + '.enc')
            //   resolve()
            // })
            resolve();
        })
    })
}

async function encode(task: Task) {
    let files: FileMeta[] =
        (checkEncodeInput(task.from) === 'dir' ? fileList(task.from) : [task.from])
            .map(f => [f, 0, 0]);

  createOutputFile(task.to);

  folderToFile(files, task.to);
}

async function decode(task: Task) {
    await deCryptFile(task);
    checkOutDir(task.to);

  fileToFolders(task.from, task.to);
}