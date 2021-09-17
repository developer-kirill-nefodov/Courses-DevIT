const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 9999 });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`новое подключение`);



    ws.on('message', (message) => {
        console.log(`получено сообщение: ${message}`);

        message = message.slice(0, 50);

        for(let client of clients) {
            client.send(message.toString());
        }
    });

    ws.on('close', () => {
        console.log(`подключение закрыто`);
        clients.delete(ws);
    });
})
