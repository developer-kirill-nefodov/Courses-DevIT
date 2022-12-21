#!/usr/bin/env Node

const fs = require('fs')

fs.writeFile(process.argv[2], process.argv[3], ()=> {})

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

let tim = true;
function fn () {

        const idx = fs.statSync(size).size / 1024
        setTimeout(() => {
            if (idx >= +process.argv[4]) {
                tim = false
                console.log(fs.statSync(size).size / 1024)
            } else {
                fs.appendFile(process.argv[2], process.argv[3], (err) => {
                    if(err) throw new Error()
                    console.log(fs.statSync(size).size / 1024)
                })
            }
        }, 1000)


}


fn()
// createReadStream(process.argv[2])
// createWriteStream(process.argv[2], {})

const {
    Transform,

} = require('stream');
