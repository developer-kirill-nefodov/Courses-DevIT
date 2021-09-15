#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const child_process = require('child_process');
const ssh2 = require('ssh2');
const optionsParser = require('./options_parser.js');

main(fillTask(process.argv));

function fillTask(argv) {
    const argsObj = optionsParser.parse(argv);

    if (!argsObj['-F']) {
        throw new Error('No file');
    }

    return { file: argsObj['-F'] };
}

function readFile(file) {
    return fs.readFileSync(file, 'utf8');
}

function parseData(data) {
    let dataAr = data.split('\n');
    let keys;
    let res = [];

    dataAr.forEach((v, i) => {
        if (i === 0) {
            keys = v.split(' ');
        }
        else {
            let obj = {};
            v.split(' ').forEach((val, index) => {
                obj[keys[index]] = val;
            });
            res.push(obj);
        }
    });

    return res;
}

function clearConsole() {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
}

function parsePorts(data) {
    let dataAr = data.split('\n').filter(v => v.indexOf('tcp') === 0);
    let res = [];
    dataAr.forEach((v) => {
        let tmp = v.split(' ').filter(v => v.length > 0);
        let address = tmp[3].split(':');
        res.push({ ip: address[0], port: address[1], program: tmp[6] });
    });
    return res;
}

function connect(data, selectedMachine) {
    const sshKey = fs.readFileSync(path.resolve(os.homedir(), '.ssh/id_rsa.pub'));
    const conn = new ssh2.Client();
    let res = [];
    conn.on('ready', () => {
        conn.exec(`echo '${sshKey}' >> ~/.ssh/authorized_keys`, (err, stream) => {
            if (err) {
                throw err;
            }
            stream.on('close', (code, signal) => {})
                .on('data', (_data) => {}).stderr
                .on('data', (errData) => {
                    console.log('STDERR: ' + errData);
                });
        });
        conn.exec('netstat -lntp4', {pty: true}, (err, stream) => {
            if (err) {
                throw err;
            }
            stream.on('close', (code, signal) => {
                viewRemoteListeningPorts(data, selectedMachine, parsePorts(res.join('')));
            }).on('data', (_data) => {
                res.push(_data.toString());
            }).stderr.on('data', (errData) => {
                console.log('STDERR: ' + errData);
            });
        });
    }).connect({
        host: selectedMachine.ip,
        username: selectedMachine.user,
        password: selectedMachine.pass,
        port: selectedMachine.port
    });
}

function createTunnel(data, selectedMachine, selectedPort, selectedLocalPort) {
    clearConsole();

    data.tunnels.push({
        machine: selectedMachine,
        remotePort: selectedPort,
        localPort: selectedLocalPort,
        process: child_process
            .exec(`ssh -L ${selectedLocalPort}:${selectedPort.ip}:${selectedPort.port} ${selectedMachine.user}@${selectedMachine.ip} -o BatchMode=yes -N`,
                (err, stdout, stderr) => {})});

    viewActiveTunnels(data);
}

function deleteTunnel(data, i) {
    child_process.exec('kill -9 ' + (data.tunnels[i].process.pid + 1), (err, stdout, stderr) => {
        data.tunnels.splice(i, 1);
        viewActiveTunnels(data);
    });
}

function viewActiveTunnels(data) {
    clearConsole();

    console.log('active tunnels');
    data.tunnels.forEach((v, i) => {
        console.log(`[${i}] ${v.machine.name} ${v.remotePort.port}->${v.localPort}`);
    });
    console.log('[c] create new');
    if (data.tunnels.length > 0) {
        console.log('[d+n] delete');
    }

    data.readline.once('line', (line) => {
        if (line === 'c') {
            viewRemoteMachines(data);
        }
        else if (line.indexOf('d') !== -1) {
            deleteTunnel(data, line.slice(1));
        }
        else {
            viewActiveTunnels(data);
        }
    });
}

function viewRemoteMachines(data) {
    clearConsole();

    console.log('remote machines');
    data.machines.forEach((v, i) => console.log(`[${i}] ${v.name} ${v.user}@${v.ip}`));
    console.log('[b] back');

    data.readline.once('line', (line) => {
        if (line === 'b') {
            viewActiveTunnels(data);
        }
        else if (data.machines[line]) {
            connect(data, data.machines[line]);
        }
        else {
            viewRemoteMachines(data);
        }
    });
}

function viewRemoteListeningPorts(data, selectedMachine, ports) {
    clearConsole();

    console.log('remote listening ports');
    ports.forEach((v, i) => console.log(`[${i}] ${v.ip}:${v.port} ${v.program}`));
    console.log('[b] back');

    data.readline.once('line', (line) => {
        if (line === 'b') {
            viewRemoteMachines(data);
        }
        else if (ports[line]) {
            setLocalPort(data, selectedMachine, ports[line]);
        }
        else {
            viewRemoteListeningPorts(data, selectedMachine, ports);
        }
    });
}

function setLocalPort(data, selectedMachine, selectedPort) {
    clearConsole();

    console.log('set local port');
    console.log('[b] back');

    data.readline.once('line', (line) => {
        if (line === 'b') {
            connect(data, selectedMachine);
        }
        else if (!Number.isNaN(line)) {
            createTunnel(data, selectedMachine, selectedPort, line);
        }
        else {
            setLocalPort(rl, machines, port);
        }
    });
}

function main(task) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let data = {
        readline: rl,
        machines: parseData(readFile(task.file)),
        tunnels: []
    };

    viewActiveTunnels(data);
}