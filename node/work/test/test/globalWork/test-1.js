#!/usr/bin/env node

console.clear()

const {
    createReadStream,
    createWriteStream
} = require('fs');

const fs = require('fs');

const file_1 = process.argv[2];
let sizeFile = Math.trunc(fs.statSync(file_1).size / 1024);

const {
    Transform,
} = require('stream');

const writeStream = createWriteStream(process.argv[3]);

class myTransform extends Transform {
    constructor() {
        super();

        this.speed = +process.argv[4];

        this.timeLeft = Math.trunc(sizeFile / this.speed);
        this.pushLeft = Math.trunc(sizeFile / 64);

        this.read_ = 0;
        this.setInt = false;
    }

    _transform(chunk, encoding, callback) {
        const timeout = this.check();

        process.stdout.cursorTo(0, 1);
        process.stdout.clearLine(0, () => {
        })

        this.read_ += this.speed;

        if (this.read_ > sizeFile) this.read_ = sizeFile;

        process.stdout.write(
            `<== ${this.speed}kb/s; === ${this.read_}kb; === file:${sizeFile}kb; === ${Math.trunc(this.timeLeft)}/s; ==>\n`
        )

        if (timeout === 1) {
            this.push(chunk);
        } else if (timeout === 0.5) {

            if (!this.setInt) {
                this.setInt = true;

                const int = setInterval(() => {

                    this.timeLeft -= 1;
                    this.read_ += this.speed;

                    if (this.read_ > sizeFile) this.read_ = sizeFile;
                    process.stdout.cursorTo(0, 1);
                    process.stdout.clearLine(0, () => {
                    })
                    process.stdout.write(
                        `<== ${this.speed}kb/s; === ${this.read_}kb; === file:${sizeFile}kb; === ${Math.trunc(this.timeLeft)}/s; ==>\n`
                    )

                    if (this.timeLeft === 1) {
                        this.push(chunk);
                        clearInterval(int);
                    }
                }, 1000);
            }
        } else if (timeout === 2) {
            for (let num = 0; num < Math.round(this.pushLeft); num++) {
                this.push(chunk)
            }
        }
    }

    check() {
        if (this.timeLeft === 1 && this.pushLeft > 1) {
            return 2;
        } else if (this.timeLeft > 1 && this.pushLeft === 1) {
            this.timeLeft -= 1;
            return 0.5;
        } else if (this.timeLeft === 1 && this.pushLeft === 1) {
            return 0;
        } else if (this.timeLeft > 1 && this.pushLeft > 1) {
            this.timeLeft -= 1;
            this.pushLeft -= 1;
            return 1;
        }
    }
}

const trans = new myTransform()

try {
    createReadStream(file_1, {encoding: 'utf-8'})
        .on('data', async (chunk) => {
            // only synchronous code here
            await setTimeout(() => trans._transform(chunk), 1000);
        })
        .pipe(writeStream)
} catch (e) {
    console.log(e);
}