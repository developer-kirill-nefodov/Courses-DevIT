const {WebSocketServer} = require('ws');
const methods = require('./methods.js')
const getQuest = require('../questions/quest');

const store = require('./Store');

const wss = new WebSocketServer({port: 9999});
const clients = new Set();

let timing = null;

wss.on('connection', (ws) => {
  console.log(`новое подключение`);

  ws.send(JSON.stringify(methods('messageUser', [], 'Ведите ваше имя')))

  ws.on('message', (message) => {
    const {data} = JSON.parse(message.toString());
    console.log('data:', data)
    if (ws.name) {
      if (store.getClients().length === store.getMinClient()) {
        if (data === store.getAnswer() && store.getRes()) {
          for (let key of store.getClients()) {
            if (key.username === ws.name) {
              store.upDateRes();
              key.trueAnswer++;

              ws.send(JSON.stringify(methods('upUser', [])));
              messageCli(methods('upDateUsers', store.getClients()));

              messageCli(methods('messageUser', [],
                `Пользователь ${key.username} дал правильный ответ!!!`));
            }
          }

          for (let key of store.getClients()) {
            if (key.trueAnswer === 5) {
              store.upDateQuest();
              messageCli(methods('wining', [],
                `Победил ${key.username}!!!...  Дал ответов [${key.trueAnswer}]`));
            }
          }

          if (store.getQuest()) {
            newQuest();
          } else {
            clearInterval(timing);
          }

        } else if (data === store.getAnswer()) {
          ws.send(JSON.stringify(methods('messageUser', [],
            'Вы опоздали с правильным ответом')));
        } else {
          ws.send(JSON.stringify(methods('messageUser', [],
            'Этот ответ не правильный')))
        }

      } else {
        ws.send(JSON.stringify(methods('messageUser', [],
          `Ждите ${store.getMinClient() - store.getClients().length} пользователей`)))
      }
    } else {
      ws.name = data;
      clients.add(ws);

      store.addClients({username: data, trueAnswer: 0, idx: store.getClients().length});

      messageCli(methods('upDateUsers', store.getClients()));
      ws.send(JSON.stringify(methods('createUser', [], data, store.getClients().length - 1)));

      messageCli(methods('messageUser', [],
        `Ждём ${store.getMinClient() - store.getClients().length} пользователей для игры`));

      if (store.getClients().length === store.getMinClient()) {
        newQuest();
      }
    }
  });

  ws.on('close', () => {
    console.log(`подключение закрыто`);
    store.deleteClient(ws.name)

    clients.delete(ws);
  });
})

function messageCli(data) {
  for (let client of clients) {
    client.send(JSON.stringify(data))
  }
}

function newQuest() {
  if (timing) {
    clearTimeout(timing);
  }

  if (store.getQuest()) {
    const {quest, trueAnswer, complexity} = getQuest();
    store.upDateAnswer(trueAnswer);

    if (!store.getRes()) {
      store.upDateRes();
    }

    if (!quest) {
      messageCli(methods('messageUser', [], 'Вопросы закончились идёт подсчет балов...'));

      setTimeout(() => {
        let maxNumber = (a, b) => a > b ? a : b;

        const max = store.getClients().map(n => n.trueAnswer).reduce(maxNumber);
        const idx = store.getClients().map(a => a.trueAnswer).indexOf(max);
        const {username, trueAnswer} = store.getClients()[idx];

        messageCli(methods('wining', [], `Победил ${username}!!!...  Дал ответов [${trueAnswer}]`));
      }, 3000)
    } else {
      messageCli(methods('messageUser', [],
        'Новый вопрос через 5 секунд... приготовьтесь'));

      messageCli(methods('time', [], 5));

      setTimeout(() => {
        messageCli(methods('messageUser', [],
          'Только один из вас может победит'));

        messageCli(methods('question', [], quest));
        messageCli(methods('time', [], complexity));

        timing = setTimeout(() => {
          newQuest();
        }, complexity * 1000);
      }, 6000)
    }
  }

}
