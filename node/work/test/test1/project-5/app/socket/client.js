const net = require('net');
const s = new net.Socket();
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(123)

rl.question('enter some text', (answer) => {

  s.write(answer);
  // s.end();
});

rl.on('line', (answer) => {
  s.write(answer);
  // s.end();
})

s.connect('./mysocket')