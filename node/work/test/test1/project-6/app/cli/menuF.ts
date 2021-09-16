import os from 'os';
import fs from 'fs';
import path from "path";
import {Client} from "ssh2";
import child_process from "child_process";

import {Page, TypeMachines, store} from "./Store";

export function MenuF(page: Page, label: string = 'null') {

    switch (page) {
        case 'active': {
            const newArr = store.getActive();
            return activeF(newArr, label);
        }

        case 'connect': {
            const newArr = store.getRemoteMachine();
            return connectF(newArr, label)
        }

        case 'remote': {
            const newArr = store.getPortMachine();
            return remoteMachineF(newArr, label);
        }

        case 'tunnel': {
            const newObj = store.getRemoteData();
            const port = store.getPort();
            return tunnelF(port, newObj, label)
        }

        default: {
            MenuF(page, label);
        }
    }
}

function activeF(arr: Array<TypeMachines>, label: string): string {
    if (arr.length) {
        if (label === 'c') {
            return 'connect';
        } else if (label[0] === 'd') {
            let num = +label.split('d', label.length)[1];

            if (num <= arr.length - 1) {
                // child.execSync(`ps -lef | grep ssh | grep localhost:5500 | awk "{print \\$2}" | xargs kill`)
            }
        } else {
            return 'err';
        }
    }

    if (label === 'c') {
        return 'connect';
    } else {
        return 'err';
    }
}

function connectF(arr: any, number: string): string {
    if (number === 'c') {
        return 'back'
    } else {
        if (+number <= arr.length - 1) {
            try {
                const c = new Client();

                let obj = {
                    host: arr[+number].host,
                    port: arr[+number].port,
                    username: arr[+number].username,
                    password: arr[+number].password
                }
                c.on('ready', () => {
                    const ssh = fs.readFileSync(path.join(os.homedir(), '/.ssh/id_rsa.pub'));

                    c.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
                        if (err) {
                            throw err;
                        }

                        stream.on('close', () => c.end());
                    });

                    c.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
                        if (err) {
                            console.error(err);
                        }

                        stream.on('data', (data: Buffer) => {
                            console.log(data.toString());

                            store.addPortMachine(data.toString())
                            store.addRemoteData(obj)

                            return 'remote';
                        });

                        stream.on('close', () => c.end());
                    });

                }).connect({
                    host: arr[+number].host,
                    port: +arr[+number].port,
                    username: arr[+number].username,
                    password: arr[+number].password
                });

                c.on('error', () => {
                    return 'err'
                })

            } catch (e) {
                return 'err'
            }
        } else {
            return 'err'
        }
    }

    return 'string'
}

function remoteMachineF(arrPort: string[], port: string) {
    let val = false;

    for (let idx of arrPort) {
        if (port === idx) val = true;
    }

    if (val) {
        store.addPort(port);
        return 'tunnel'
    } else {
        return 'err'
    }
}

function tunnelF(PORT: string, obj:TypeMachines, newPort: string) {
    const {host, port, username, password} = obj;

    if (2999 < +newPort) {
        const childTunnel = child_process.spawn(`ssh -tt -NL ${newPort}:localhost:${PORT} ${username}@${host}`, {shell: true});

        childTunnel.stderr.on('data', (data) => {
            if (data.includes('cannot')) return 'err'
        });

        store.addActive({host: host, port: String(newPort), username: username, password: password});

        return 'active'
    } else {
        return 'err'
    }
}