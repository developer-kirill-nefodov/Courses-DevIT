const {Readable, Transform, Writable, pipeline} = require('stream');

class MyReadable extends Readable {
    constructor(readData) {
        super({objectMode: true});
        this.readData = readData;
    }

    _read() {
        this.push(this.readData)
        this.push(null);
    }

}

class MyTransform extends Transform {
    _transform(chunk, encode, callback) {
        const result = chunk.toString().split('').map((n) => {
            return n * n;
        });
        const newResult = new Set([...result])

        callback(null, [...newResult.values()].join());
    }
}

class MyWrite extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString())
        callback();
    }
}

const myRead = new MyReadable('123561283213215375743761321');
const myTransform = new MyTransform();
const myWrite = new MyWrite();

pipeline(myRead, myTransform, myWrite, (err) => {
    if (err) throw new Error(err);
})