import fs from 'fs';
import os from 'os';
import path from "path";
import {Client} from 'ssh2';
import readline from "readline";
import child_process from 'child_process';

import {TypeMachines, Page, Task, store} from "./Store";
import {MenuF} from "./menuF";
import net from "net";

import ErrnoException = NodeJS.ErrnoException;

readFile(__dirname + '/test.txt');

/** <<<<<<>>>>>> */
const tasks: Array<Task> = [];

const unixSocket = '../mySocket';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('connect');

    socket.on('data', (data: Buffer) => {
        const ts: Task = JSON.parse(data.toString())

        tasks.push(ts);

        const {action, label} = ts;

        new Promise((resolve) => {
            const res = MenuF(action, label)

            if (res === 'err') {
                throw new Error('error')
            }

            resolve(action);
        }).then((data) => {
            if (data === 'active') {
                tasks[tasks.length - 1].data = store.getActive();
                socket.write(JSON.stringify(tasks[tasks.length - 1]))
            }
            if (data === 'connect') {
                tasks[tasks.length - 1].data = store.getRemoteMachine();
                socket.write(JSON.stringify(tasks[tasks.length - 1]))
            }
            if (data === 'remote') {
                tasks[tasks.length - 1].data = store.getPortMachine();
                socket.write(JSON.stringify(tasks[tasks.length - 1]))
            }
            if (data === 'tunnel') {
                tasks[tasks.length - 1].data = store.getRemoteData();
                tasks[tasks.length - 1].label = store.getPort();

                socket.write(JSON.stringify(tasks[tasks.length - 1]))
            }
        }).catch(() => {
            socket.write('err')
        })

        socket.on('close', () => console.log('socket close'));
    })
})

server.listen(unixSocket);

server.on('error', (err: ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        fs.unlink(unixSocket, () => server.listen(unixSocket));
    } else {
        console.log(err);
    }
});

/** <[*]>  <[*]> */


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function Menu(page: Page): void {
    switch (page) {
        case 'active': {
            const newArr = store.getActive();
            active(newArr);
        }
            break;
        case 'connect': {
            const newArr = store.getRemoteMachine();
            connect(newArr)
        }
            break;
        case 'remote': {
            const arrPort = store.getPortMachine();
            const removeObj = store.getRemoteData()
            remoteMachine(arrPort, removeObj);
        }
            break;
        case 'tunnel': {
            const port = store.getPort()
            const remote = store.getRemoteData()
            tunnel(port, remote);
        }
            break;
        default: {
            Menu('active');
        }
    }
}

function active(arr: Array<TypeMachines>) {
    console.clear()

    console.log('/ --- active tunnel --- /')
    console.log('id | port | username')

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
                Menu('connect');
            } else if (label[0] === 'd') {
                let num = +label.split('d', label.length)[1]

                if (num <= arr.length - 1) {
                    // child.execSync(`ps -lef | grep ssh | grep localhost:5500 | awk "{print \\$2}" | xargs kill`)
                }
            } else {
                active(arr);
            }
        })
    } else {
        console.log('<--- new tunnel = [c] --->');

        rl.question('[c]', (label) => {
            if (label === 'c') {
                Menu('connect');
            } else {
                active(arr);
            }
        })
    }
}

function connect(arr: Array<TypeMachines>) {
    console.clear()

    console.table(arr);

    rl.question('[num]', (number) => {

        if (number === 'c') {
            Menu('active');
        } else {
            if (+number <= arr.length - 1) {
                try {
                    let obj: TypeMachines = {
                        host: arr[+number].host,
                        port: arr[+number].port,
                        username: arr[+number].username,
                        password: arr[+number].password
                    }

                    const conn = new Client();

                    conn.on('ready', () => {
                        const ssh = fs.readFileSync(path.join(os.homedir(), '/.ssh/id_rsa.pub'));
                        conn.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
                            if (err) {
                                throw err;
                            }

                            stream.on('close', () => conn.end());
                        });

                        conn.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
                            if (err) {
                                console.error(err);
                            }

                            stream.on('data', (data: Buffer) => {

                                store.addPortMachine(data.toString())
                                store.addRemoteData(obj)
                                Menu('remote');
                            });

                            stream.on('close', () => conn.end());
                        });

                    }).connect({
                        host: arr[+number].host,
                        port: +arr[+number].port,
                        username: arr[+number].username,
                        password: arr[+number].password
                    });

                    conn.on('error', () => {
                        console.log('ERROR CONNECT')
                        setTimeout(() => Menu('connect'), 2000)
                    })
                } catch (err) {
                    console.log('((((9');
                    setTimeout(() => Menu('connect'), 2000)
                }

            } else {
                console.log('((((9');
                setTimeout(() => Menu('connect'), 2000)
            }
        }
    })
}

function remoteMachine(arrPort: string[], obj: TypeMachines) {
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
            Menu('tunnel')
        } else {
            remoteMachine(arrPort, obj);
        }
    })
}

function tunnel(PORT: string, obj: TypeMachines) {
    console.clear()
    console.log('Port\n')

    const {host, port, username, password} = obj;

    rl.question(`[${PORT}]: `, (newPort) => {

        if (2999 < +newPort) {
            const childTunnel = child_process.spawn(`ssh -tt -NL ${newPort}:localhost:${PORT} ${username}@${host}`, {shell: true});

            childTunnel.stderr.on('data', (data: Buffer) => {
                if (data.includes('cannot')) {
                    console.log(`\nWarning: The tunnel has not been forwarded, remove the connection on port ${port}\n`);
                }
            });

            store.addActive({host: host, port: newPort, username: username, password: password})

            Menu('active');
        } else {
            console.log('(((((9')
            setTimeout(() => tunnel(PORT, obj), 2000)
        }
    })
}

function readFile(file: string) {
    const arr: string[] = [];
    const data: TypeMachines[] = [];

    fs.readFileSync(file, 'utf-8').split(/\n/).forEach((value) => {
        arr.push(value);
    })

    for (let key of arr) {
        let idx = key.split(' ')
        if (idx.length === 4) {
            data.push({host: idx[0], port: String(idx[1]), username: idx[2], password: idx[3]})
        }
    }
    store.addRemoteMachine(data)
}

// Menu()