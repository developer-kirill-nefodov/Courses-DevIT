const net = require('net');

const fs = require('fs');

const readline = require('readline');


const unixSocket = './mySocket';
const server = net.createServer()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

server.on('connection', (socket) => {

    console.log('connect');

    rl.on('line', (data) => {
        socket.write(data)
    })


    socket.on('data', (data) => {
        console.log(data)
        switch (data.toString()) {
            case 'active': {


            }
                break;

            case 'connect': {


            }
                break;

            case 'tunnel': {


            }
                break;

            case 'add': {

            }
                break;

            default: {

            }
        }
    })


    socket.on('close', () => console.log('socket close'));
})

server.listen(unixSocket);


// удалить сокет
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        fs.unlink(unixSocket, () => server.listen(unixSocket));
    } else {
        console.log(err);
    }
});


//
// // const server = net.createServer((conn) => {
// //     console.log('connected');
// //
// //     // rl.on('line', (data) => {

// //
// //     conn.on('close', () => {
// //         console.log('client closed connection');
// //     });
// // }).listen(unixSocket);
//
//
// server.on('data', (data) => {
//     console.log(data)
// })
//

//
//
// process.on('uncaughtException', (err) => {
//     console.log(err);
// });


