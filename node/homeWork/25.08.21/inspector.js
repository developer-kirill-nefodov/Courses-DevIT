// Инспектор... Модуль предоставляет API для взаимодействия с V8 инспектором
const inspector = require('inspector');
const fs = require('fs');

/** inspector.SessionИспользуются для отправки сообщений на V8 инспектор
 *  фоновых и получение ответов сообщений и уведомления */
const session = new inspector.Session();


// console.log(Object.keys(inspector));

/**
 inspector.open([port[, host[, wait]]])
 port <номер> Порт для прослушивания подключений инспектора. По желанию. По умолчанию: то, что было указано в CLI.
 host <string> Хост для прослушивания подключений инспектора. По желанию. По умолчанию: то, что было указано в CLI.
 wait <boolean> Блокировать, пока не подключится клиент. По желанию. По умолчанию: false .
 */
// inspector.open(3001 , 'localhost', true)
/** inspector.close Деактивировать инспектора. Блокирует до тех пор, пока нет активных подключений */
// inspector.close()

/** inspector.console Объект для отправки сообщений на удаленную консоль инспектора */
// inspector.console.log('a message');

/** 'inspectorNotification' Выдается при получении любого уведомления от V8 Inspector. */
// session.on('inspectorNotification', (message) => console.log(message.method));

/** Подключает сеанс к бэкэнду инспектора. */
// session.connect()

/** Отправляет сообщение в серверную часть инспектора.
 callback будет уведомлен, когда будет получен ответ. */
// session.connect();
//
// session.post('Profiler.enable', () => {
//     session.post('Profiler.start', () => {
//         // Вызов измеряемой бизнес-логики здесь...
//
//         // some time later...
//         session.post('Profiler.stop', (err, { profile }) => {
//             // Записать профиль на диск, загрузить итд.
//             if (!err) {
//                 fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
//             }
//         });
//     });
// });


/** Вернуть URL активного инспектора или, undefined если его нет. */

/**
 $ node --inspect -p 'inspector.url()'
 $ node --inspect=localhost:3000 -p 'inspector.url()'
 * */

/** Пример использования */

const fd = fs.openSync('profile.heapsnapshot', 'w');

session.connect();

session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
    fs.writeSync(fd, m.params.chunk);
});

session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
    console.log('HeapProfiler.takeHeapSnapshot done:', err, r);
    session.disconnect();
    fs.closeSync(fd);
});