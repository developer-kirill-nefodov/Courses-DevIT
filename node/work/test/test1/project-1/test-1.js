#!/usr/bin/env node
// ./test-1.js readFile.txt "ProtoData" 7000K
const fs = require('fs');
const path = require('path')
const {
    Readable,
    Transform
} = require('stream')

const file = path.resolve(process.argv[2]);

const obj = {'M': 1024000, 'K': 1024, 'B': 1};

let type, type1;

for (let key in obj) {
    fs.appendFile(file, process.argv[3], ()=> {})
    const val = process.argv[4].indexOf(key)
    if (val > 0) {
        type = process.argv[4][val];
        type1 = +process.argv[4].split(type)[0] * obj[type];
    }
}

class MyReadable extends Readable {
    constructor(fileName) {
        super({ objectMode: true });
    }

    _read() {
        this.push(process.argv[3]+'\n');
    }

}

class MyTransform extends Transform {
    _transform(chunk, encode, callback) {
        fs.appendFileSync(file, chunk.toString())
        this.push(chunk);
        callback()
    }
}

const readFile = new MyReadable(file);
const trans = new MyTransform()
const writFile = fs.createWriteStream(file);

function fn(idx) {
    console.log(type1)
    if(idx < type1 || type1 === undefined) {
        readFile.pipe(trans).pipe(writFile);
        fn(idx)
    } else {
        console.log('file: ', idx, type)

    }

}

fn(fs.statSync(file).size)