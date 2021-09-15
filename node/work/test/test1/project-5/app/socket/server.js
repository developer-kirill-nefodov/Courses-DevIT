const net = require("net");
const fs = require('fs');

net.createServer(function (socket) {
    console.log("connected");

    socket.on('data', function (data) {
        console.log(data.toString())
    });
}).listen(3002);

const server = net.createServer(socket => {
  console.log('connected');
  socket.end('hello');
})

server.listen('./mysocket');