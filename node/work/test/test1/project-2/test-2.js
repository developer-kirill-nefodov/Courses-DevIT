#!/usr/bin/env node
//  ./test-2.js crypto: pass salt

const fs = require('fs');

const {
    createReadStream, createWriteStream
} = require("fs");

const path = require("path");

const {
    scrypt, createCipheriv, scryptSync, createDecipheriv
} = require("crypto");

const {
    Readable, Writable, Transform, pipeline
} = require("stream");

const [, , cr, pass, salt] = process.argv

let structure1 = [], structure2 = [], xxx = 0;
structure1Dir('./testDir')

class MyReadable extends Readable {
    constructor(file, start) {
        super({objectMode: true});
        this.file = file;
        this.size = fs.statSync(file).size;
        this.start = start;
    }

    _read() {

            structure2[structure2.length] = [this.file, this.start, xxx += this.size];

            fs.readFile(this.file, (err, data) => {
                if (err) console.log(err);

                this.push(data);
                this.push(null)
            })

    }
}


function structure1Dir(dir, files_) {
    files_ = files_ || [];

    let files = fs.readdirSync(dir);

    for (let i in files) {
        let name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory()) structure1Dir(name, files_);
        else files_.push(name);
    }

    structure1 = files_;
}

(function glob(i) {

    if (cr === 'crypto:') {
        const algorithm = 'aes-192-cbc';
        const key = scryptSync(pass, salt, 24);
        const iv = Buffer.alloc(16, 0);

        const output = createWriteStream('./srt.txt', {flags: 'a'})

        const decipher = createCipheriv(algorithm, key, iv);



        if(i === structure1.length-1) {

        }else {

           const a = new Promise((resolve)=> {
               const readFile = new MyReadable(structure1[i], fs.statSync('./srt.txt').size);
               readFile.pipe(decipher).pipe(output);

               resolve();
           })

            a.then(()=> {
                console.log(structure2);
                glob(i += 1)
            })
        }


    } else if (cr === '') {

    }

})(0)


