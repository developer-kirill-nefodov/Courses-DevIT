const {getIPRange} = require('get-ip-range')

const os = require('os');
const fs = require('fs');

const {exec, spawn} = require('child_process')

const Netmask = require('netmask').Netmask;

async function Glob() {

    const ipChunks = listToChunk(getIPRange(process.argv[2]), I)


    let result = []

    for await (const value of {ipChunks, ...await ping(ipChunks), ...await ssh(ipChunks)}) {
        result = result.concat(value);
    }

    console.log(result)
}

function ping(ip){
    return new Promise((resolve) => {
        resolve({ping: true, latency: 10})
    })
}

function ssh(ip) {
    return new Promise((resolve) => {
        resolve({ssh: false})
    })
}



Glob().then()

// function start(ip) {
//     ip += 1
//
//     const child = spawn(`${ping}`, ['-c 1', IP[ip]])
//
//     child.stdout.on('data', (data) => {
//             console.log(IP[ip], 'yes')
//
//
//     })
//
//     child.stdout.on('error', (err) => {
//         console.log(ip, 'no')
//     })
//
//
//
//     child.on('close', () => {
//
//         start(ip)
//
//
//     })
//
// }


// function start1(idx) {
//     console.log(IP[idx++])
//
//     exec(`${ping} -c 1 ${IP[idx]}`, (err, data) => {
//         if (err) {
//             // console.log(IP[idx], 'no')
//         } else {
//             // console.log(IP[idx], 'yes')
//         }
//     })
//         .on('close', () => {
//
//             if (IP[idx]) {
//                 start(idx += 1);
//             }
//
//         })
//
// }


function listToChunk(list, count) {
    let i,j, tmp = [];

    for (i = 0,j = list.length; i < j; i += count) {
        tmp.push(list.slice(i, i + count))
    }

    return tmp;
}
