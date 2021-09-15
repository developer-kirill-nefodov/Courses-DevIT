const readline = require('readline');

const net = require('net');
const client = new net.Socket();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


client.setEncoding('utf8');

// Подключение к серверу
client.connect ('./mySocket','localhost:3000', () => {

});

// Полученные данные отправляются серверу
// process.stdin.on('data', function (data) {
//   // console.log(data);
//
//
//
// });


client.on('data', (data) => {
  console.log(data);
  setTimeout(() => {client.write('123')}, 2000)
});

// При закрытии сервера
client.on('close',function() {
  console.log('connection is closed');
});