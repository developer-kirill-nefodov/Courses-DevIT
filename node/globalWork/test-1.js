#!/  node

const {createReadStream, createWriteStream} = require('fs');

const path = require('path');
const fs = require('fs');


const file_1 = process.argv[2];
let sizeFile = Math.round(fs.statSync(file_1).size);


const {
    // Readable,
    Writable,
    // Duplex,

    Transform,
    pipeline
} = require('stream');

const readStream = createReadStream(process.argv[2]);

const writeStream = createWriteStream(process.argv[3]);

// class CounterWriter extends Writable {
//     constructor() {
//         super();
//     }
//
//     _write(chunk, encoding, callback) {
//
//         callback();
//     }
// }

class myTransform extends Transform {

    constructor({throttle}) {
        super();
        if (typeof throttle === "number") {
            this.throttle = throttle;
        } else {
            this.throttle = 100;
        }

        this.timeshtamp = 0;
        this.count = 0;
    }

    _transform(chunk, encoding, callback) {
        process.stdout.cursorTo(0, 1);
        process.stdout.clearLine(0, () => {
        })

        const timeout = this.check(chunk)
        let a = Math.round(this.throttle);
        let b = Math.round(sizeFile / this.throttle);

        process.stdout.write(`${a}kb/s; ${sizeFile -= a*100}kb; ${b}/s;`)
        setTimeout(() => {
            this.push(chunk);

            callback()
            this.update(chunk.length)
        }, 1000)
    }

    check() {
        const diff = Date.now() - this.timeshtamp;
        // console.log(diff)

        if (diff > 1000) return 0;
        if (this.count < this.throttle * 1024) return 0;

        return 1000 - diff;
    }

    update(size) {
        this.count += size;
        if (Date.now() - this.timeshtamp > 1000) {
            this.count = 0;
            this.timeshtamp = Date.now();
        }
    }
}

const trans = new myTransform({throttle: +process.argv[4]})

pipeline(readStream, trans, writeStream, (err) => {
    if (err) throw new Error(err);
})


