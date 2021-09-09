#!/usr/bin/env node
// ./test-3.js 192.168.0.1/24 ./active.json
const fs = require('fs');
const util = require('util');

const {getIPRange} = require('get-ip-range');
const exec = util.promisify(require('child_process').exec);

const listIp = getIPRange(process.argv[2]);

main(require('os').cpus().length - 1, process.argv[3])

function getIp(ipArr) {
    return ipArr.pop();
}

async function ping(ip) {
    try {
        const {stdout} = await exec(`ping -c 1 ${ip}`);
        console.log(ip, 'stdout:', stdout);
        return {ping: true}
    } catch (err) {
        console.log(ip, 'no connect');
        return {ping: false}
    }
}

async function ssh(ip) {
    try {
        // const {stdout} = await exec(`ssh root@${ip}`);
        // console.log(ip, 'stdout:', stdout);
        return {ssh: true}
    } catch (err) {
        console.log(ip, 'no connect');
        return {ssh: false}
    }
}

async function collectObj(ip) {
    const p = (await ping(ip));
    if (p?.ping) {
        const s = (await ssh(ip));
        return s.ssh === true ? {IP: ip, ping: p.ping, ssh: s.ssh} : null;
    }
    return null;
}

async function Glob(arr, file) {
    let newArr = [...arr];
    const obj = await collectObj(getIp(listIp))

    if (obj) newArr.push(obj);

    if (listIp.length) {
        Glob(newArr, file).catch(console.log)

    } else write(newArr, file)
}

function main(count, file) {
    for (let idx = 0; idx < count; idx++) {
        Glob([], file).catch(console.log)
    }
    console.log('end')
}

function write(arr, file) {
    if (file === 'console') {
        console.log(JSON.stringify(arr))
    } else {
        fs.writeFileSync(file, JSON.stringify(arr), {flag: 'w'})
    }
    process.stdout.end()
}