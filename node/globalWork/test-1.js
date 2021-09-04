#!/usr/bin/env node

console.clear()
const {createReadStream, createWriteStream} = require('fs');

const path = require('path');
const fs = require('fs');

const file_1 = process.argv[2];
let sizeFile = Math.trunc(fs.statSync(file_1).size / 1024);


const {
    // Readable,
    Writable,
    // Duplex,

    Transform,
    pipeline
} = require('stream');

const readStream = createReadStream(process.argv[2]);
const writeStream = createWriteStream(process.argv[3]);

class myTransform extends Transform {
    constructor() {
        super();

        this.throttle = +process.argv[4]

        this.idx = Math.trunc(sizeFile / this.throttle)
        this.number = Math.trunc(sizeFile / 64);

        this.read_ = 0;
    }

    _transform(chunk, encoding, callback) {
        const int = setInterval(() => {
            const timeout = this.check();
            process.stdout.cursorTo(0, 1);
            process.stdout.clearLine(0, () => {
            })

            this.read_ += this.throttle;

            if (this.read_ > sizeFile) this.read_ = sizeFile;

            // console.log(this.idx, 'idx')
            // console.log(this.number, 'number')
            // console.log(this.throttle, 'throttle')
            // console.log(sizeFile, 'sizeFile')


            if (timeout === 1) {
                this.push(chunk);
            } else if (timeout === 0.5) {

            } else if (timeout === 0 && this.number === 1) {
                this.push(chunk);
                clearInterval(int)
            } else if (timeout === 2) {
                for (let num = 0; num < Math.round(this.number); num++) {
                    this.push(chunk)
                }
            }
            process.stdout.write(
                `<== ${this.throttle}kb/s; === ${this.read_}kb; === file:${sizeFile}kb; === ${Math.trunc(this.idx)}/s; ==>\n`
            )
            callback()
        }, 1000)
    }

    check() {
        if (this.idx === 1 && this.number > 1) {
            return 2;
        } else if (this.idx > 1 && this.number === 1) {
            this.idx -= 1;
            return 0.5;
        } else if (this.idx === 1 && this.number === 1) {
            return 0;
        } else if (this.idx > 1 && this.number > 1) {
            this.idx -= 1;
            this.number -= 1;
            return 1;
        }
    }
}

const trans = new myTransform()

pipeline(readStream, trans, writeStream, (err) => {
    if (err) throw new Error(err);
})


