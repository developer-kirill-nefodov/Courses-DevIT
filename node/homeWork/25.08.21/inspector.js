/** const inspector = require('inspector') - получаем доступ к инспектору
inspector.Session -                          используются для отправки сообщений на инспектору V8
                                             и получение ответных сообщений.
session.connect()                            Подключает сеанс инспектора.
session.disconnect()                         Отключаемся от инспектора
session.post(method[, params][, callback]) - Отправляет сообщение инспектору.
                                             callback будет уведомлен, когда будет получен ответ.
                                             callback - это функция, которая принимает два
                                             необязательных аргумента: ошибку и результат,
                                             зависящий от сообщения.
*/

// Инспектор... Модуль предоставляет API для взаимодействия с V8 инспектором
const inspector = require('inspector');
const fs = require('fs');

/** inspector.SessionИспользуются для отправки сообщений на V8 инспектор
 *  фоновых и получение ответов сообщений и уведомления */
const session = new inspector.Session();
/**
 inspector.open([port[, host[, wait]]])
 port <номер> Порт для прослушивания подключений инспектора. По желанию. По умолчанию: то, что было указано в CLI.
 host <string> Хост для прослушивания подключений инспектора. По желанию. По умолчанию: то, что было указано в CLI.
 wait <boolean> Блокировать, пока не подключится клиент. По желанию. По умолчанию: false .
 */
console.log(777)
inspector.open(3001 , 'localhost', true)
/** inspector.close Деактивировать инспектора. Блокирует до тех пор, пока нет активных подключений */
// inspector.close()

/** inspector.console Объект для отправки сообщений на удаленную консоль инспектора */
inspector.console.log('a message');

/** 'inspectorNotification' Выдается при получении любого уведомления от V8 Inspector. */
session.on('inspectorNotification', (message) => console.log(123));

/** Подключает сеанс к бэкэнду инспектора. */
// session.connect()

/** Отправляет сообщение в серверную часть инспектора.
 callback будет уведомлен, когда будет получен ответ. */
// session.connect();

/** Профайлер ЦП */
session.connect();

session.post('Profiler.enable', () => {
    session.post('Profiler.start', () => {

        session.post('Profiler.stop', (err, { profile }) => {

            if (!err) {
                fs.writeFileSync('./test/index.views', JSON.stringify(profile));
            }
        });
    });
});


/** Вернуть URL активного инспектора или, undefined если его нет. */

/**
 $ node --inspect -p 'inspector.url()'
 $ node --inspect=localhost:3000 -p 'inspector.url()'
 * */

/** Пример использования */

/**
const inspector = require('inspector');
const fs = require('fs');
const session = ts inspector.Session();
session.connect();

//пример показывающий как использовать CPU Profiler
session.post('Profiler.enable', () => {
  session.post('Profiler.start', () => {
    session.post('Profiler.stop', (err, { profile }) => {
      if (!err) {
        fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
      }
    })
  });
});

const fd = fs.openSync('profile.heapsnapshot', 'w');

//пример показывающий как использовать профилировщик кучи
session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
  fs.writeSync(fd, m.params.chunk);
});

session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
  console.log('HeapProfiler.takeHeapSnapshot done:', err, r);
  session.disconnect();
  fs.closeSync(fd);
});
 */

/**
const fs = require('fs');

fs.readFile('index.views', "utf8", (err, data)=>{
  console.log(data.replace("body", "div"));
  fs.writeFile("index2.views", data.replace("body", "div"), (err) => {
    console.log("ok");
  });
});

fs.open('index.views', 'r', (err, fd) => {
  fs.read(fd, (err, data, buff) => {
    fs.write(fs.openSync('index3.views', 'w'), buff.toString("utf8").replace("body", "div"), (err) => {
      console.log("ok");
    });
  });
})*/