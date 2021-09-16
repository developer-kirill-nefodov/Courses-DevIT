//@ts-ignore
const net = require('net');

//@ts-ignore
const fs = require('fs');
//@ts-ignore
const os = require('os');

//@ts-ignore
const path = require('path');

const readline = require('readline');
//@ts-ignore
const child = require('child_process');

const {Client} = require('ssh2');

//@ts-ignore
const store = require('./Store');
const unixSocket = '../mySocket';

const server = net.createServer()

const menuF = require('./menuF')

readFile(__dirname+'/test.txt')

server.on('connection', (socket) => {
    console.log('connect');

    //data: {met: 'active', label: 'c|num'}
    socket.on('data', (data) => {
        data = JSON.parse(data.toString())

        console.log(data)
        const {method, label} = data
        new Promise((resolve) => {
            // @ts-ignore

            //@ts-ignore


            // //res:string = active, connect,  remote, tunnel, err
            const res = menuF(method, label)

            if (res === 'err') {
                throw new Error('error')
            }

            //@ts-ignore
            resolve(0);
        }).then(() => {
            if (method === 'active') {
                const newObj = {
                    method: 'active',
                    label: store.getActive()
                }
                socket.write(JSON.stringify(newObj))
            }
            if (method === 'connect') {
                const newObj = {
                    method: 'connect',
                    label: store.getRemoteMach()
                }
                socket.write(JSON.stringify(newObj))
            }
            if (method === 'remote') {
                const newObj = {
                    method: 'remote',
                    label: store.getPortArr()
                }
                socket.write(JSON.stringify(newObj))
            }
            if (method === 'tunnel') {
                const newObj = {
                    remote: store.getRemoteObj(),
                    port: store.getPort()
                }
                socket.write(JSON.stringify(newObj))
            }
        }).catch(() => {
            socket.write('err')
        })

        socket.on('close', () => console.log('socket close'));
    })
})

server.listen(unixSocket);

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        fs.unlink(unixSocket, () => server.listen(unixSocket));
    } else {
        console.log(err);
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



function MenuC(page: string | void, ...data) {
    switch (page) {
        case 'active': {
            //@ts-ignore
            const newArr = store.getActive();
            activeC(newArr);
        }
            break;
        case 'connect': {
            const newArr = store.getRemoteMach();
            connectC(newArr)
        }
            break;
        case 'remote': {
            //@ts-ignore
            const arrPort = store.getPort();
            const removeObj = store.getRemoteObj()
            remoteMachineC(arrPort, removeObj);
        }
            break;
        case 'tunnel': {
            const port = store.getPort()
            const remote = store.getRemoteObj()
            tunnelC(port, remote);
        }
            break;
        default: {
            MenuC('active');
        }
    }
}

function activeC(arr) {
    console.clear()

    console.log('/ --- active tunnel --- /')
    console.log
    (`\
   ___________________________
id: | <PORT>   |   <USERNAME> |
   ___________________________\
`)

    if (arr.length) {
        for (let key of arr) {
            for (let idx = 0; idx < arr.length - 1; idx++) {
                console.log(`[${idx}]| ${key.port}  |  ${key.username} |`)
            }
            console.log(`| ${key.port}  |  ${key.username} |`)
        }
        console.log('<--- [c] new tunnel --->')
        console.log('<--- [d+n] --->')

        rl.question('[?]', (label) => {
            if (label === 'c') {
                MenuC('connect');
            } else if (label[0] === 'd') {
                let num = +label.split('d', label.length)[1]

                if (num <= arr.length - 1) {
                    // child.execSync(`ps -lef | grep ssh | grep localhost:5500 | awk "{print \\$2}" | xargs kill`)
                }
            } else {
                activeC(arr);
            }
        })
    } else {
        console.log('<--- new tunnel = [c] --->');

        rl.question('[c]', (label) => {
            if (label === 'c') {
                MenuC('connect');
            } else {
                activeC(arr);
            }
        })
    }
}

function connectC(arr) {
    console.clear()

    console.table(arr);

    rl.question('[num]', (number) => {

        if (number === 'c') {
            MenuC('active');
        } else {
            if (number <= arr.length - 1) {
                try {
                    let obj = {
                        host: arr[number].host,
                        port: arr[number].port,
                        username: arr[number].username,
                        password: arr[number].password
                    }

                    const conn = new Client();

                    conn.on('ready', () => {
                        const ssh = fs.readFileSync(path.join(os.homedir(), '/.ssh/id_rsa.pub'));
                        conn.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
                            if (err) throw err;

                            stream.on('close', () => conn.end());
                        });

                        conn.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
                            if (err) console.error(err);

                            stream.on('data', (data) => {
                                console.log(data.toString());

                                //@ts-ignore
                                store.upDateRemotePort(data);
                                store.addRemoteObj(obj)
                                MenuC('remote');
                            });

                            stream.on('close', () => conn.end());
                        });

                    }).connect(obj);

                    conn.on('error', () => {
                        console.log('ERROR CONNECT')
                        setTimeout(() => MenuC('connect'), 2000)
                    })
                } catch (err) {
                    console.log('((((9');
                    setTimeout(() => MenuC('connect'), 2000)
                }

            } else {
                console.log('((((9');
                setTimeout(() => MenuC('connect'), 2000)
            }
        }
    })
}

function remoteMachineC(arrPort, obj) {
    console.clear()

    for (let key of arrPort) console.log(`[${key}]`)
    console.log('\n')

    rl.question('[?]', (port) => {
        let val = false;

        for (let idx of arrPort) {
            if (port === idx) val = true;
        }

        if (val) {
            store.addPort(port);
            MenuC('tunnel')
        } else {
            remoteMachineC(arrPort, obj);
        }
    })
}

function tunnelC(PORT, obj) {
    const {host, port, username, password} = obj;

    console.clear()

    console.log('Port\n')
    rl.question(`[${PORT}]: `, (newPort) => {

        if (2999 < +newPort) {
            console.log(`ssh -L ${newPort}:localhost:${PORT} ${username}@${host}`);


            const childTunnel = child.spawn(`ssh -tt -NL ${newPort}:localhost:${PORT} ${username}@${host}`, {shell: true});


            childTunnel.stderr.on('data', (data) => {
                if (data.includes('cannot')) {
                    console.log(`\nWarning: The tunnel has not been forwarded, remove the connection on port ${port}\n`);
                }
            });

            //@ts-ignore
            store.addActive({host: host, port: newPort, username: username, password: password});

            MenuC('active');

        } else {
            console.log('(((((9')
            setTimeout(() => tunnelC(PORT, obj), 2000)
        }
    })
}

function readFile(file) {
    let arr = [], data = [];

    fs.readFileSync(file, 'utf-8').split(/\n/).forEach((value) => {
        arr.push(value);
    })

    for (let key of arr) {
        let idx = key.split(' ')
        if (idx.length === 4) {
            data.push({host: idx[0], port: idx[1], username: idx[2], password: idx[3]})
        }
    }
    store.addRemotes(data);
}