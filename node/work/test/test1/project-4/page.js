const Store = require('./Store.js');

const fs = require('fs');
const os = require('os');
const path = require('path');

const readline = require('readline');

const {Client} = require('ssh2');

const child = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function Menu(page, ...data) {
    switch (page) {
        case 'active': {
            /** newArr */
            const newArr = Store.getActive();
            activeT(newArr);
        }
            break;
        case 'connect': {
            const newArr = readFile('./test.txt');
            connect(newArr)
        }
            break;
        case 'remote': {
            const arrPort = Store.getPort();
            remoteMachine(arrPort, data[0])
        }
            break;

        case 'tunnel': {
            tunnel(data[0], data[1])
        }
            break;

        case 'killTunnel': {
            killTunnel(data[0])
        }
            break;
        default: {
            Menu('active')
        }
    }
}

function activeT(arr) {
    process.stdout.write('\033c');

    console.log('/ --- active tunnel --- /')
    console.log
    (`\
___________________________
| <PORT>   |   <USERNAME> |
___________________________\
`)
    if (arr.length) {
        for (let key of arr) console.log
        (`| ${key.port}  |  ${key.username} |`)
        console.log('<--- new tunnel = [c] --->')
        console.log('<--- kill tunnel = [d] --->')

        rl.question('[?]', (label) => {
            if (label === 'c') Menu('connect');
            else if (label === 'c') Menu('killTunnel', arr)
            else activeT(arr);
        })
    } else {
        console.log('<--- new tunnel = [c] --->');

        rl.question('[c]', (label) => {
            if (label === 'c') Menu('connect');
            else activeT(arr);
        })
    }
}

Menu('active')

function connect(arr) {

    process.stdout.write('\033c');

    console.table(arr);
    let obj;

    rl.question('[num]', (number) => {

        obj = {
            host: arr[number].host,
            port: arr[number].port,
            username: arr[number].username,
            password: arr[number].password
        }

        fn(obj)
    })
}

function fn(obj) {
    const conn = new Client();
    conn.on('ready', () => {
        console.log('Client :: ready')
        const ssh = path.join(os.homedir(), '/.ssh/id_rsa.pub');
        conn.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
            if (err) throw err;

            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            });

            stream.on('error', (err) => {
                console.log('ERROR CONNECT')
                setTimeout(() => connect(arr), 2000)
            });
        });

        conn.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
            if (err) console.error(err);

            stream.on('data', (data, extended) => {
                console.log(data.toString());

                Store.upDateRemotePort(data)
                Menu('remote', obj)
            });
        });

    }).connect(obj);
}

function remoteMachine(arrPort, obj) {
    process.stdout.write('\033c');

    for (let key of arrPort) console.log(`[${key}]`)
    console.log('\n')

    rl.question('[?]', (port) => {
        let val = false;

        for (let idx of arrPort) if (port === idx) val = true;

        if (val) Menu('tunnel', port, obj)
        else remoteMachine(arrPort, obj);
    })
}

function tunnel(PORT, obj) {
    const {host, port, username, password} = obj;

    process.stdout.write('\033c');

    console.log('Port\n')
    rl.question(`[${PORT}]: `, (newPort) => {

        console.log(`ssh -L ${newPort}:localhost:${PORT} ${username}@${host}`);

        child.exec(`ssh -f -L ${newPort}:localhost:${PORT} ${username}@${host}`, (err) => {

            if (err) console.error(err);
        }).on('error', (err) => {
            console.log(err);
            setTimeout(() => tunnel(PORT, obj), 3000)
        }).on('close', (data) => {
            Store.addActive({
                host: host,
                port: PORT,
                username: username,
                password: password
            })

            Menu('active')
        });
    })
}

function killTunnel(arr) {
    process.stdout.write('\033c');

    const newArr = [];

    for (let key of arr) newArr.push({port: key.port, username: key.username})

    console.table(newArr);
    console.log('num delete')
    rl.question('[d]', (num) => {
        if (num <= newArr.length - 1) {

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
    return data;
}