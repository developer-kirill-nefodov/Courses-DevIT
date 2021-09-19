const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({port: 9999});

const clients = new Set();
const getQuest = require('../questions/quest')

let result = true;

const storeUser = [];

const methods = {
    start: false,

    message: {
        0: {method: 'messageUser', userArr: [], data: {mess: 'Ведиете ваше имя'}},
        1: {method: 'messageUser', userArr: [], data: {mess: `Ждём ${5 - storeUser.length} пользователей для игры`}},
        2: {method: 'messageUser', userArr: [], data: {mess: `Ждите ${5 - storeUser.length} пользователей`}},
        3: {method: 'messageUser', userArr: [], data: {mess: `Игра начнёться через 5 секунд... приготовьтесь`}},
        4: {method: 'messageUser', userArr: [], data: {mess: ``}},
        5: {method: 'messageUser', userArr: [], data: {mess: `Вы опоздали с правильным ответом(((`}}
    },

    update: {
        0: {method: 'upDateUsers', userArr: storeUser, data: {}}
    },

    question: {
        0: {method: 'question', userArr: [], data: {mess: '', time: 30}},
    },

    time: {
        0: {method: 'time', userArr: [], data: {mess: '', time: 5}}
    },

    create: {
        0: {method: 'creatUser', userArr: [], data: {mess: '', trueAnswer: 0, idx: storeUser.length}}
    },

    wining: {
        0: {method: 'win', userArr: storeUser, data: {mess: '', trueAnswer: 0}}
    }

}

wss.on('connection', (ws) => {
    console.log(`новое подключение`);

    ws.send(JSON.stringify(methods.message[0]))

    ws.on('message', (message) => {
        const {data, method} = JSON.parse(message.toString());

        if (ws.name) {
            if (storeUser.length === 2) {
                if (method === 'start' && !methods.start) {
                    methods.start = true;
                    methods.question[0].data.mess = getQuest()
                    messageCli(methods.question[0]);
                }

                if (method === '1' && result) {
                    for (let key of storeUser) {
                        if (key.username === ws.name) {
                            result = false;
                            key.trueAnswer++;
                            methods.message[4].data.mess = `Пользователь ${key.username} дал правельный ответ!!!`;
                            messageCli(methods.message[4]);
                        }
                    }

                    setTimeout(() => {
                        for (let key of storeUser) {
                            if (key.trueAnswer === 5) {
                                methods.wining[0].data.mess = key.username;
                                methods.wining[0].data.trueAnswer = key.trueAnswer;
                                messageCli(methods.wining[0]);
                            }
                        }

                        messageCli(methods.update[0]);
                        methods.question[0].data.mess = getQuest();
                        messageCli(methods.question[0]);
                        result = true;
                    }, 4000)
                } else {
                    ws.send(JSON.stringify(methods.message[5]));
                    setTimeout(() => {
                        methods.question[0].data.mess = getQuest()
                        messageCli(methods.question[0]);
                    }, 4000)
                }

            } else {
                ws.send(JSON.stringify(methods.message[2]))
            }
        } else {
            ws.name = data;
            clients.add(ws);

            storeUser.push({username: data, trueAnswer: 0, idx: storeUser.length});
            console.log(data)
            methods.create[0].data.mess = data;
            ws.send(JSON.stringify(methods.create[0]));

            messageCli(methods.update[0]);
            messageCli(methods.message[1]);

            if (storeUser.length === 2) {
                messageCli(methods.message[3]);
                messageCli(methods.time[0]);
            }
        }
    });

    ws.on('close', () => {
        console.log(`подключение закрыто`);
        const idx = storeUser.map(e => e.username).indexOf(ws.name);
        storeUser.splice(idx, 1)

        clients.delete(ws);
    });
})


function messageCli(data) {
    for (let client of clients) {
        client.send(JSON.stringify(data))
    }
}