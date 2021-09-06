#!/usr/bin/env node

const fs = require('fs')

fs.writeFile(process.argv[2], process.argv[3], () => {
})

const {
    open,
    appendFile,
    writeFile,
    createWriteStream,
    createReadStream
} = require('fs');

const os = require('os');

const stream = require('stream');
const size = process.argv[2];

function fn() {
    let tim = true;

    do {
        const idx = fs.statSync(size).size / 1024

            if (idx >= +process.argv[4]) {
                tim = false
                console.log(fs.statSync(size).size / 1024)
            } else {
                fs.appendFile(process.argv[2], process.argv[3], (err) => {
                    if (err) throw new Error()
                    console.log(fs.statSync(size).size / 1024)
                })
            }

    } while (tim)


}


fn()
// createReadStream(process.argv[2])
// createWriteStream(process.argv[2], {})

const {
    Transform,

} = require('stream');