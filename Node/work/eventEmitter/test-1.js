const fs = require("fs");
const path = require('path');

const {EventEmitter} = require('events');

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
// some.test_2('test-1.js', '../Node-os')
/** test-3 */

let buff1, buff2, newSet;

server.on('event-3.1', (arr) => buff1 = Buffer.from(arr))
server.on('event-3.2', (arr) => buff2 = Buffer.from(arr))
server.on('event-3.3', () => newSet = new Set([...buff1, ...buff2]))

server.emit('event-3.1', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
server.emit('event-3.2', [1, 22, 33, 4, 5, 6, 7, 8, 9, 1e0])
server.emit('event-3.3')

// console.log(newSet)

/** test-4 */

server.on('event-4.1', (arch) => {
  fs.readFile('./testFile.txt', (err, data) => {
    if (err) throw new Error(err)
    console.log('file changed')
  })
})
// server.on('event-4.2', () => {})

// server.emit('event-4.1')
// server.emit('event-4.2')
