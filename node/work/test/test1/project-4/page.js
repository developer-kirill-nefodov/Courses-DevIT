const fs = require('fs')

const readline = require('readline');

const {exec} = require('child_process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.prompt()

const Connection = require('ssh2').Client;

function Menu(page, file, ...data) {
    switch (page) {
        case 'creatOne': {
            creatOne()
        }
            break;
        case 'creatTwo': {
            creatTwo()
        }
            break;
        case 'connect': {
            connect(file)
                .catch(console.error)

        }
            break;
        case 'delete': {
            deleteFn(file)
                .catch(console.error)
        }
            break;
        default: {
            Path()
        }
    }

}

// Menu()

function creatOne() {
    process.stdout.write('\033c');
    console.log('<--- creatOne --->')

    rl.question('[c]', (label) => {
        if (label === 'c') {
            Menu('creatTwo')
        } else creatOne()
    })
}

function creatTwo() {
    process.stdout.write('\033c');

    console.log('/ --- active tunnel --- /\n')
    console.log('<--- creatTwo --->')

    rl.question('[c]', (label) => {

        if (label === 'd') {
            creatTwo()
        } else Path()

    })
}



async function connect(file, err = null) {
    const newArr = JSON.parse(await readFile(file));

    process.stdout.write('\033c');
    if (err) {
        console.log("\x1b[31m", 'Error');
    }
    console.table(newArr);

    rl.question('[num]', (number) => {
        const c = new Connection();

        c.on('connect', () => {
            console.log('Connection :: connect');
        });

        c.on('ready', () => {
            console.log('Connection :: ready');

            //add awk '{print $4}'
            //add awk '{print $4}'
            //add awk '{print $4}'

            c.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
                if (err) console.log(err);

                stream.on('data', (data, extended) => {
                    console.log((extended === 'stderr' ? 'STDERR: ' : 'STDOUT: ') + data);
                });
                stream.on('end', () => {
                    console.log('Stream :: EOF');
                });
                stream.on('close', () => {
                    console.log('Stream :: close');
                });
                stream.on('exit', (code, signal) => {
                    console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
                    c.end();
                });
            });
        });
        c.on('error', (err) => {
            console.log('Connection :: error :: ' + err);
            connect(file, err)
        });

        c.connect({
            host: newArr[+number].host,
            port: newArr[+number].port,
            username: newArr[+number].username,
            password: newArr[+number].password
        });
    })
}

// connect(readFile('./test.json'))



function Path() {
    process.stdout.write('\033c');

    console.log('[creatOne] || [c1] --- ');
    console.log('[creatTwo] || [c2] --- ');
    console.log('[connect]  || [c3] --- ');
    console.log('[delete]   || [d] --- \n');

    rl.question('[?]', (label) => {
        if (label === 'creatOne' || label === 'c1') Menu('creatOne');
        else if (label === 'creatTwo' || label === 'c2') Menu('creatTwo');
        else if (label === 'connect' || label === 'c3') Menu('connect', './test.json');
        else if (label === 'delete' || label === 'd') Menu('delete', './test.json');
        else Path()
    })
}

function readFile(file) {
    return fs.readFileSync(file);
}

function writeFile(file, arr) {
    fs.writeFileSync(file, JSON.stringify(arr))
}

async function deleteFn(fileArr) {
    let newArr;

    typeof fileArr === "string" ? newArr =
        JSON.parse(await readFile(fileArr)) : newArr = fileArr;

    process.stdout.write('\033c');
    console.log('<--- delete --->');

    console.table(newArr)

    rl.question('[d]', (label) => {
        if(label <= newArr.length) {
            newArr.splice(+label, 1);
            deleteFn(newArr);
        } else {
            writeFile('./test.json', newArr);
            Path();
        }
    })
}
