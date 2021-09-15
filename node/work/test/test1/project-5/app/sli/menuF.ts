// @ts-ignore
const fs = require('fs');
// @ts-ignore
const os = require('os');
// @ts-ignore
const path = require('path');
// @ts-ignore
const child = require('child_process')

// @ts-ignore
const store = require('./Store');

function MenuF(page, ...data) {
    switch (page) {
        case 'active': {
            const newArr = store.getActive();
            return activeF(newArr, data[0]);
        }

        case 'connect': {
            const newArr = store.getRemoteMach();
            return connectF(newArr, data[0])
        }

        case 'remote': {
            const newArr = store.getPortArr();
            return remoteMachineF(newArr, data[0]);
        }

        case 'tunnel': {
            const newObj = store.getRemoteObj();
            const port = store.getPort();
            return tunnelF(port, newObj, data[0])
        }

        default: {
            MenuF('active')
        }
    }
}

function activeF(arr, label) {

    if (arr.length) {
        if (label === 'c') {
            return 'connect'
        } else if (label[0] === 'd') {
            let num = +label.split('d', label.length)[1]

            if (num <= arr.length - 1) {
                // child.execSync(`ps -lef | grep ssh | grep localhost:5500 | awk "{print \\$2}" | xargs kill`)
            }
        } else {
            return 'err'
        }
    } else {
        if (label === 'c') {
            return 'connect'
        } else {
            return 'err'
        }
    }
}

function connectF(arr, number) {
    if (number === 'c') {
        return 'back'
    } else {
        if (+number <= arr.length - 1) {
            try {
                const c = new Client();

                let obj = {
                    host: arr[number].host,
                    port: arr[number].port,
                    username: arr[number].username,
                    password: arr[number].password
                }
                c.on('ready', () => {
                    const ssh = fs.readFileSync(path.join(os.homedir(), '/.ssh/id_rsa.pub'));

                    c.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
                        if (err) throw err;

                        stream.on('close', () => c.end());
                    });

                    c.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
                        if (err) console.error(err);

                        stream.on('data', (data) => {
                            console.log(data.toString());

                            //@ts-ignore
                            store.upDateRemotePort(data);
                            store.addRemoteObj(obj)

                            return 'remote';
                        });

                        stream.on('close', () => c.end());
                    });

                }).connect(obj);

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
}

function remoteMachineF(arrPort, port) {
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

function tunnelF(PORT, obj, newPort) {
    const {host, port, username, password} = obj;

    if (2999 < +newPort) {

        const childTunnel = child.spawn(`ssh -tt -NL ${newPort}:localhost:${PORT} ${username}@${host}`, {shell: true});

        childTunnel.stderr.on('data', (data) => {
            if (data.includes('cannot')) return 'err'
        });

        //@ts-ignore
        Store.addActive({host: host, port: newPort, username: username, password: password});

        return 'active'
    } else {
        return 'err'
    }

}

module.exports = MenuF;