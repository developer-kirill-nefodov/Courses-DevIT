const fs = require('fs')

const readline = require('readline');

const {exec} = require('child_process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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
        case 'delete': {
            deleteFn(file, [
                {name: 'xxx', ip: 'ip', port: 123, user: 'xxx', pass: '12345'},
                {name: 'xxx', ip: 'ip', port: 321, user: 'xxx', pass: '12345'},
                {name: 'xxx', ip: 'ip', port: 213, user: 'xxx', pass: '12345'},
            ])
        }
            break;
        case 'connect': {
            connect(data[0], data[1])
        }
            break;
    }

}

// Menu('delete', '', [])

function creatOne() {
    process.stdout.write('\033c');
    console.log('creat.txt')

    rl.question('[c]', (label) => {
        if (label === 'c') {
            Menu('two')
        } else creatOne()
    })
}

function creatTwo() {
    process.stdout.write('\033c');

    console.log('/ --- active tunnel --- /\n')
    console.log('/ --- emptr --- /')

    rl.question('[c]', (label) => {

        if (label === 'd') {
            Menu('delete')
        } else creatTwo()

    })
}

function deleteFn(fileCount, arr) {
    const newArr = [
        ...arr,
    ]

    process.stdout.write('\033c');
    console.log('creat.txt')

    console.table(newArr)

    rl.question('[num]', (label) => {
        if (label <= newArr.length) {
            newArr.splice(+label, 1)
            deleteFn(0, newArr)
        } else {
            Menu('creat')
        }
    })
}

//  function getDataFile(file) {
//     let a = [];
//
//     fs.readFile('test.json', (err, data) => {
//         if(err) console.log(err)
//        // console.log(data.toString())
//
//         a.push(JSON.parse(data))
//         console.log(JSON.parse(data))
//
//     })
//
//
// }
//
// getDataFile()
//
// rl.on('line', (data) => {
//
//     switch (data) {
//         case 'menu': {
//
//         }
//             break;
//
//         default: {
//             rl.close()
//         }
//     }
//
// })

function connect(arr) {
    console.table(arr)

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

            c.exec("netstat -lpt4en | awk '${print $4}'", {}, (err, stream) => {
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
        });

        c.connect({
            host: arr[+number].host,
            port: arr[+number].port,
            username: arr[+number].username,
            password: arr[+number].password
        });

    })
    // const conn = new Client();
    //
    // conn.on('ready', () => {
    //     console.log('Client :: ready');
    //     conn.exec('sudo docker ps', {pty: true},  (err, stream) => {
    //         if (err) throw err;
    //         stream.on('close', (code, signal) => {
    //             conn.end();
    //
    //             // data comes here
    //         }).on('data', (data) => {
    //             console.log('STDOUT: ' + data);
    //
    //         }).stderr.on('data', (data) => {
    //             console.log('STDERR: ' + data);
    //         });
    //         // stream.end(user.password+'\n');
    //
    //     });
    //
    // }).connect({
    //         host: '192.168.0.143',
    //         username: 'developer',
    //         pass: 654321
    //     }
    // )
}

// connect([
//     {host: '192.168.0.161', port: 22, username: 'developer', password: '654321'},
//     {host: '192.168.0.135', port: 22, username: 'developer', password: '654321'},
//     {host: '192.168.0.138', port: 22, username: 'developer', password: '654321'},
//     {host: '192.168.0.143', port: 22, username: 'developer', password: '654321'},
// ])

function readFile(file) {
    return fs.readFileSync(file);
}

console.log(JSON.parse(readFile('./test.json')))

// const lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('test.json')
// });
//
// let arr = []
// lineReader.on('line', function (line) {
//
//     console.log('Line from file:', line);
// });

