const net = require("net");
// const fs = require('fs');

// net.createServer(function (socket) {
//     console.log("connected");

//     socket.on('data', function (data) {
//         fs.writeFileSync('./testFile', data.toString());
//     });
// }).listen(8080);

const server = net.createServer(socket => {
  console.log('connected');
  socket.end('hello');
})

server.listen('./mysocket');