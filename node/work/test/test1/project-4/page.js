const Store = require('./Store.js');

const fs = require('fs');
const os = require('os');

const path = require('path');

const readline = require('readline');

const Connection = require('ssh2').Client;


const child = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function Menu(page, file) {
    switch (page) {
        case 'active': {
            const newArr = Store.getActive()
            activeT(newArr);
        }
            break;
        case 'connect': {
            const newArr = readFile('./test.txt');
            connect(newArr)
        }
            break;
        case 'remote': {
            const newArr = Store.getRemote()
            remoteMachine(newArr)
        }
            break;
        case 'delete': {
            // deleteFn(file)
            //     .catch(console.error)
        }
            break;
        default: {

        }
    }

}

function activeT(arr) {
    process.stdout.write('\033c');

    console.log('/ --- active tunnel --- /\n')

    if (arr.length) console.table(arr)

    console.log('<--- new tunnel = [c] --->')

    rl.question('[c]', (label) => {

        if (label === 'c') Menu('connect')
        else activeT(arr)
    })
}

// Menu('active')

function connect(arr, err = null) {

    const ssh = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDaQOpJZ5g0h9Fef9FbdSvNShfZ2PXYERlPntiDF9bUP2GRXvVmP+Ij8lxWp248Xp4SdsILQo2n6Xynb/D2ahN7z0Zqbivq1nQnKu/qr59P/m9ulWTHfyU09IKujkxyIrnuZu72YVB+1bICfF3sLi6kNWSc8DR7cZY5e2FW6qK1fayjFx0usyYqHlu6JF+18YdSmlFvfe/QdDTlC3uD5I+t9mV0IBK8Hy/otOv3MH6YwZ/k9LKAStl64PTzmHh4QetijN/qkMK+eTRGVP67/x4rVus9yEhjI0rJDeHtgGygBaY0jcfAelzDoAcqobzn9DY5AlF7uvEtJi1E5VwmitKj+/hiBCwuvYsf9RZtdwOSY8Nw+VUj3AT6YsjzYiSWrXaoYo24hMZUPm566fqE6T+Bky3MBG+2WeA43IfTU8iZJSBBOzFRnexgj3cjpIGvT9sODRWUxdfdR8BnNOyiOR4SlyZDc9Jn5avOkWTZnyqDv+UwsNqa/fwuwyxeS0ssteU= school@school4'
    // const ssh = fs.readFileSync(path.resolve(os.homedir(), '/.ssh/id_rsa.pub'))

    process.stdout.write('\033c');

    if (err) console.log("\x1b[31m", 'Error');

    console.table(arr);

    rl.question('[num]', (number) => {


        const c = new Connection();

/// Error: Not connected!!!
        // c.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
        //
        //     if (err) throw err;
        //
        //     stream.on('close', function(code, signal) {
        //         console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        //         c.end();
        //     }).on('data', function(data) {
        //         console.log('STDOUT: ' + data);
        //     }).stderr.on('data', function(data) {
        //         console.log('STDERR: ' + data);
        //     });
        //     stream.on('error', (err) => {
        //         connect(arr, err)
        //     });
        // });

        // c.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
        //     if (err) console.error(err);
        //
        //     stream.on('data', (data, extended) => {
        //         console.log(data);
        //
        //         let arr = [], newAtt = [], arrPort = [];
        //         arr.push(...data.toString().split('\n'))
        //
        //         for (let idx of arr) {
        //             if (idx[0]++ >= 0) newAtt.push(idx)
        //         }
        //
        //         for (let idx of newAtt) {
        //             let start = idx.indexOf(':');
        //             let finish = idx.indexOf('-');
        //
        //             arrPort.push(idx.slice(start + 1, finish - 1))
        //         }
        //
        //         Store.upDateRemote(arrPort);
        //         Menu('remote')
        //     });
        // });
        //
        // c.on('error', (err) => connect(arr, err));

        c.connect({
            // host: arr[+number].host,
            // port: arr[+number].port,
            // username: arr[+number].username,
            // password: arr[+number].password

            host: '192.168.0.161',
            port: '22',
            username: 'school',
            password: '654321'
        });

    })
}

Menu('connect')

function remoteMachine(arr) {
    process.stdout.write('\033c');

    for (let key of arr) console.log(`[${key}]`)

    console.log('\n')

    rl.question('[?]', (port) => {
        let val = false;

        for (let idx of arr) {
            if (port === idx) val = true;
        }

        if (val) {
            lastPath(port)
        } else {
            remoteMachine(arr);
        }
    })
}

// remoteMachine(['53', '22', '631', '6003'])

function lastPath(obj) {
    const {host, port, username, password} = obj;

    process.stdout.write('\033c');

    console.log('Port\n')
    rl.question(`[${port}]: `, (label) => {

        console.log(`ssh -Lf ${label}:localhost:${port} ${username}@${host}`)
        child.exec(`ssh -L ${label}:localhost:${port} ${username}@${host}`, (err) => {
            if (err) console.error(err)
            else {
                Store.addActive({
                    host: host,
                    port: port,
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
        if (idx.length === 5) {
            data.push({host: idx[1], port: idx[2], username: idx[3], password: idx[4]})
        }
    }
    return data;
}


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