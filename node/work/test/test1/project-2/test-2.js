#!/usr/bin/env node
//  ./test-2.js './srt.txt' crypto pass salt './testDir'

const fs = require('fs');

const {
    createReadStream, createWriteStream
} = require("fs");

const path = require("path");

const {
    scrypt, createCipheriv, scryptSync, createDecipheriv
} = require("crypto");

const {
    Readable, Writable, Transform, pipeline
} = require("stream");

let structure1 = [], structure2 = [], start = 0;


function fillArg() {
    if (process.argv.length < 6) throw new Error('Error: arg < 6')

    switch (process.argv[3]) {
        case 'encode': {
            structure1Dir(process.argv[6]);
            folderToFile(structure1, process.argv[2]);
            crypt(process.argv[4], process.argv[5])
        }
            break;

        case 'decode': {
            decrypt(process.argv[2], process.argv[4], process.argv[4])
        }
            break;

        default:
            throw new Error('Wrong action')


    }
}

function folderToFile(files, output, offset = 0) {
    if (files.length !== offset) {

        structure2[offset] = [files[offset], fs.statSync(output).size]

        pipeline([
            fs.createReadStream(files[offset]),
            fs.createWriteStream(output, {flags: 'a'})
        ], () => {
            structure2[offset][2] = fs.statSync(output).size;
            folderToFile(files, output, ++offset)
        })
    } else {
        const fds = fs.openSync(output, 'a')
        fs.writeSync(fds, '\nMETA\n')
        for (const file of structure2) {
            fs.writeSync(fds, file.join(',') + '\n')
        }
        fs.closeSync(fds);
    }
}


function crypt(pass, salt) {
    const algorithm = 'aes-192-cbc';
    const key = scryptSync(pass, salt, 24);
    const iv = Buffer.alloc(16, 0);

    const decipher = createCipheriv(algorithm, key, iv);


    pipeline(
        createReadStream(process.argv[2]),
        decipher,
        createWriteStream('./srt1.txt'),
        (err) => {
            if (err) console.log(err)
            // fs.rm(process.argv[2], ()=> {})
        }
    )

}

function decrypt(file, pass, salt) {
    const a = new Promise((resolve) => {
        pipeline(
            createReadStream(file),
            createDecipheriv('aes-192-cbc', pass, salt),
            createWriteStream(file),
            () => {
            }
        )
        resolve()
    })

    a
        .then(() => checkOutDir(file))
        .then(() => fileToFolders('./decDir', './file'))
}

function fileToFolders(input, outDir) {
    const files = readFileMeta(input)

    function saveFiles(files, offset = 0) {
        if (files.length === offset) {
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

function structure1Dir(dir, files_) {
    files_ = files_ || [];

    let files = fs.readdirSync(dir);

    for (let i in files) {
        let name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory()) structure1Dir(name, files_);
        else files_.push(name);
    }

    structure1 = files_;
}

function normalizeResultPath(file, outDir) {
    return path.join(outDir, file.replace('..', '.'))
}

function readFileMeta(file) {
    const size = fs.statSync(file).size
    const fds = fs.openSync(file, 'r')
    let buffer = Buffer.alloc(100)
    let offset = size - buffer.length

    fs.readSync(fds, buffer, {position: offset})
    const str = buffer.toString('utf-8')
    const lastDataIndex = parseInt(str.slice(str.lastIndexOf(',') + 1))

    if (isNaN(lastDataIndex)) {
        throw new Error('Wrong input file')
    }

    buffer = Buffer.alloc(size - lastDataIndex - 7)

    fs.readSync(fds, buffer, {position: lastDataIndex + 6})

    return buffer.toString()
        .split('\n')
        .map(s => s.split(','))
        .map(([file, start, end]) => [file, parseInt(start), parseInt(end)])
}

function checkOutDir(outDir) {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, {recursive: true});
    }
}

fillArg()
