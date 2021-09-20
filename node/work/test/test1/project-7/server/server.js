const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({port: 9999});

const clients = new Set();
const getQuest = require('../questions/quest')

let result = true;

const storeUser = [];
const countClient = 2;

const methods = {
    start: true,
    quest: true,
    result: true,

    message: {
        0: {method: 'messageUser', userArr: [], data: {mess: 'Ведиете ваше имя'}},
        1: {
            method: 'messageUser',
            userArr: [],
            data: {mess: `Ждём ${countClient - storeUser.length} пользователей для игры`}
        },
        2: {method: 'messageUser', userArr: [], data: {mess: `Ждите ${countClient - storeUser.length} пользователей`}},
        3: {method: 'messageUser', userArr: [], data: {mess: `Игра начнёться через 5 секунд... приготовьтесь`}},
        4: {method: 'messageUser', userArr: [], data: {mess: ``}},
        5: {method: 'messageUser', userArr: [], data: {mess: `Вы опоздали с правильным ответом(((`}},
        6: {method: 'messageUser', userArr: [], data: {mess: `Новый вопрос через 5 секунд... приготовьтесь`}}
    },

    answer: {0: {method: 'upUser', userArr: [], data: {}}},
    update: {0: {method: 'upDateUsers', userArr: storeUser, data: {}}},
    question: {0: {method: 'question', userArr: [], data: {mess: '', time: 30}},},
    time: {0: {method: 'time', userArr: [], data: {mess: '', time: 5}}},
    create: {0: {method: 'creatUser', userArr: [], data: {mess: '', trueAnswer: 0, idx: storeUser.length}}},
    wining: {0: {method: 'wining', userArr: storeUser, data: {mess: '', trueAnswer: 0}}}
}

wss.on('connection', (ws) => {
    console.log(`новое подключение`);

    ws.send(JSON.stringify(methods.message[0]))

    ws.on('message', (message) => {
        const {data, method} = JSON.parse(message.toString());

        if (ws.name) {
            if (storeUser.length === countClient) {

                if (method === 'start' && methods.start) {
                    methods.start = false;
                    methods.question[0].data.mess = getQuest()
                    messageCli(methods.question[0]);
                }

                if (method === 'newQuest' && methods.quest) {
                    newQuest();
                }

                if (method === '1' && methods.result) {
                    for (let key of storeUser) {
                        if (key.username === ws.name) {
                            methods.result = false;
                            ws.send(JSON.stringify(methods.answer[0]))
                            key.trueAnswer++;
                            methods.message[4].data.mess = `Пользователь ${key.username} дал правельный ответ!!!`;
                            messageCli(methods.message[4]);
                            messageCli(methods.update[0]);
                        }
                    }

                    for (let key of storeUser) {
                        if (key.trueAnswer >= 5) {
                            methods.wining[0].data.mess = `Победил ${key.username}!!!...  дал ответов [${key.trueAnswer}]`;
                            messageCli(methods.wining[0]);
                        }
                    }

                } else if (method === '1') {
                    ws.send(JSON.stringify(methods.message[5]));
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

            if (storeUser.length === countClient) {
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

function newQuest() {
    if (methods.quest) {
        methods.quest = false;
        messageCli(methods.message[6]);
        messageCli(methods.time[0]);
        setTimeout(() => {
            methods.question[0].data.mess = getQuest();
            messageCli(methods.question[0]);
            methods.quest = true;
            methods.result = true;
        }, 5000)
    }
}