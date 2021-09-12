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
            // activeT(newArr);
            activeT([
                {name: 'kirill', ip: '192.168.0.169', port: 22, user: 'kiril@kirill', password: '654321'},
                {name: 'kirill', ip: '192.168.0.169', port: 22, user: 'kiril@kirill', password: '654321'},
                {name: 'kirill', ip: '192.168.0.169', port: 22, user: 'kiril@kirill', password: '654321'},
            ]);
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
______________________________________________________________________
|  <NAME>   |    <IP>     |   <PORT>   |   <USER>  |    <PASS>       |
______________________________________________________________________\
`)
    if (arr.length) for (let key of arr) console.log
    (`|  ${key.name}  |  ${key.ip}  |  ${key.port}  |  ${key.user}   |  ${key.password}  |`)


    console.log('<--- new tunnel = [c] --->')

    rl.question('[c]', (label) => {

        if (label === 'c') Menu('connect')
        else activeT(arr)
    })
}

// Menu('active')

function connect(arr) {
    // const ssh = fs.readFileSync(path.resolve(os.homedir(), '/.ssh/id_rsa.pub'))
    const ssh = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDkO/LP5/b4mpC8qX9OXi4QW7YDCWR0lcxqqnbG+5mZHCVKy0J7zfCTAKxO+FiVx7VSI1RqjGvfAp2+IrqgyttsG+yT9u5OlLA5LUi+YpArAW0Pc7WXjeIP/EpY1D0vIq4NuQSn5TgN6xmtL8rX2FFzLHTHmELCbaUaT31Z+kdJvYMoksrJvUTBiq594UhpaPCgphkcB44M1rGsKlhH+dEa+Tpgj3CV82Ortw9S+fgOIDZF+GBFTTyz/HutoR4l+mG6Uq4TR174iObvs+XRg4OJ0J47j6BfQ/52Q/xnFRQP5R9nX3+CYJigcdSll6jEcE+QHFzP3IUHwGk30Zibec/H kiril@kiril-X551MA'

    process.stdout.write('\033c');

    console.table(arr);

    rl.question('[num]', (number) => {


        const obj = {
            host: arr[+number].host,
            port: arr[+number].port,
            username: arr[+number].username,
            password: arr[+number].password
        }

        console.log(obj);

        const c = new Client();

/// Error: Not connected!!!
        c.on('ready', () => {
            c.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
                if (err) throw err;

                stream.on('close', (code, signal) => {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    c.end();
                });

                stream.on('error', (err) => {
                    console.log('ERROR CONNECT')
                    setTimeout(() => connect(arr), 2000)
                });
            });

            c.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
                if (err) console.error(err);

                stream.on('data', (data, extended) => {
                    console.log(data);

                    Store.upDateRemotePort(data)
                    Menu('remote', obj)
                });
            });

            c.on('error', (err) => {
                console.log('DATA ERROR')
                setTimeout(() => connect(arr), 2000)
            });

            c.connect(obj);

            // c.connect({
            //     host: '192.168.0.107',
            //     port: '22',
            //     username: 'kiril@kiril-X551MA',
            //     password: '12345678'
            // });
        })
    })
}

Menu('connect')

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

// remoteMachine(['53', '22', '631', '6003'])

function tunnel(PORT, obj) {
    const {host, port, username, password} = obj;

    process.stdout.write('\033c');

    console.log('Port\n')
    rl.question(`[${PORT}]: `, (newPort) => {

        console.log(`ssh -L ${newPort}:localhost:${PORT} ${username}@${host}`)
        //-q Тихий режим
        child.exec(`ssh -L ${newPort}:localhost:${PORT} ${username}@${host}`, (err) => {
            if (err) console.error(err);
            else {
                Store.addActive({
                    host: host,
                    port: PORT,
                    username: username,
                    password: password
                })

                Menu('active')
            }
        });
    })
}

// lastPath({host: '192.168.0.179', port: '5500', username: 'developer', password: '654321'})

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

// console.log(readFile('./test.txt'))

// function Path() {
//     process.stdout.write('\033c');
//
//     console.log('[creat]    || [c1] --- ');
//     console.log('[connect]  || [c2] --- ');
//     console.log('[delete]   || [d]  --- \n');
//
//     rl.question('[?]', (label) => {
//         if (label === 'creatOne' || label === 'c1') Menu('creatOne');
//         else if (label === 'creatTwo' || label === 'c2') Menu('creatTwo');
//         else if (label === 'connect' || label === 'c3') Menu('connect', './test.txt');
//         else if (label === 'delete' || label === 'd') Menu('delete', './test.txt');
//         else Path()
//     })
// }

// console.log(fs.createReadStream(path.resolve(os.homedir(), '/.ssh/id_rsa.pub')))