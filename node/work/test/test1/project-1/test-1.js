#!/usr/bin/env node
// ./test-1.js -s 1K -v "ProtoData" ./readFile.txt

const fs = require('fs');
const path = require('path')

const {Readable} = require('stream')
const obj = {'M': 1024000, 'K': 1024, 'B': 1};

const f = process.argv[2] === '-s' ? process.argv[3] : '1K';
const f1 = process.argv[4] === '-v' ? process.argv[5] : 'test';
const file = process.argv[6] === undefined ? path.resolve('./testFile.txt') : path.resolve(process.argv[6])

let size;

for (let key in obj) {
    const val = f.indexOf(key)

    if (val > 0) size = +f.split(f[val])[0] * obj[key] / 1024;
}

class MyReadable extends Readable {
    constructor(fileName, data, size) {
        super({ objectMode: true });
        this.file = fileName;
        this.data = data;
        this.size = size;
    }

    _read() {
        const sizeFile = fs.statSync(this.file).size / 1024;

        if(sizeFile >= this.size) {
            console.log('sizeFile', sizeFile)
        } else {
            this.push(this.data + '\n');
        }
    }
}

const readFile = new MyReadable(file, f1, size);
const writFile = fs.createWriteStream(file);

readFile.pipe(writFile);