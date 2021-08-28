const {EventEmitter} = require('events');
const path = require('path');
const fs = require("fs");

const server = new EventEmitter();

/** test-1 */
server.on('test-1.1', function () {
    console.log('О выполнении')
})

server.on('test-1.2', function () {
    console.log('Готово с исполнением')
})
/** test-1 */

/** test-2 */
server.on('test-2', function (a, b) {
    const path1 = path.resolve(__dirname, b);

    fs.readdir(path1, {withFileTypes: true}, (err, files) => {
        if (err) throw new Error(err);
        const path2 = path.resolve(__dirname, a);

        fs.readFile(path2, (err, data) => {
            if (err) throw new Error(err);
            console.log(data.toString());
        })

    })
})
/** test-2 */

class Some extends EventEmitter {
    constructor() {
        super();
    }

    test_1() {
        console.log('Перед выполнением')
        server.emit('test-1.1')
        console.log('Выполняется задание')
        server.emit('test-1.2')
        console.log('После исполнения')
    }

    test_2(fileName, dirPath) {
        server.emit('test-2', fileName, dirPath)
    }
}

const some = new Some();

// some.test_1()
// some.test_2('test-1.js', '../node-os')
/** test-3 */

