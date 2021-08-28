const EventEmitter = require('events').EventEmitter; // Берем соответствующее св-во

const server = new EventEmitter(); // создаем объект с его свойствами-методами

// emitter.on(eventName, listener)
// eventName <String> | <Symbol>
// listener <Function>
// emitter.addListener(eventName, listener) Alias
// server.setMaxListeners(20);

server.on('request', request => request.approved = true); // Подписка

server.on('request', request => console.log(request));
server.on('request', request => console.log(request));

// emitter.emit(eventName[, arg1][, arg2][, ...])
// синхронно вызывает каждого из обработчиков, зарегистрированных на событие под названием eventName,
// в том порядке, они были зарегистрированы, передавая аргументы каждому из них.
// Выдает true (верно), если у события были обработчики, в ином случае false (ложь).
server.emit('request', {from: 'Client'});

// server.emit('request', {from: 'Another client'});

// let counter = 0;
// server.on('counter', () => console.log(++counter));

// server.emit('counter');

// server.emit('counter');

// emitter.once(eventName, listener)
// eventName <String> | <Symbol>
// listener <Function>
// Добавляет функцию обработчика единоразово для события с именем eventName.
// В следующий раз когда eventName срабатывает, этот обработчик удаляется, а затем вызывается.
// server.once('once', data => console.log(data));
// server.emit('once', {id: 30, name: 'Tom'});
// server.emit('once', {id: 30, name: 'Tom'});
// server.on('once', data => console.log(data));
// server.emit('once', {id: 30, name: 'Tom'});
// server.emit('once', {id: 30, name: 'Tom'});

// emitter.prependListener(eventName, listener)
// Добавляет функцию listener (обработчика) к началу массива обработчиков события для события с именем eventName.
// Не делается никаких проверок, чтобы увидеть добавлен ли уже listener.
// Несколько вызовов передающих ту же комбинацию eventName и listener приведут к тому, что listener будет
// добавлен и вызван множество раз.
// server.on('prepend', data => console.log(data, '1'))
// server.on('prepend', data => console.log(data, '2'))
// server.prependOnceListener('prepend', data => console.log(data,'3'));
// server.prependOnceListener('prepend', data => console.log(data,'4'));

// server.emit('prepend', {id: 3, name: 'prepend'})
// server.emit('prepend', {id: 3, name: 'prepend'})

// emitter.prependOnceListener(eventName, listener)
// Добавляет функцию обработчика единожды для события с именем eventName в начало массива обработчиков.
// В следующий раз когда eventName срабатывает, этот обработчик удаляется, а затем вызывается.
// server.prependOnceListener('prepend', (stream) => {
//     console.log('Ah, we have our first user!');
// });

// emitter.listenerCount(eventName), eventName <String> | <Symbol>
// Показывает количество обработчиков событий, которые обрабатывают событие под названием eventName.
// console.log(server.listenerCount('request'));
// console.log(EventEmitter.listenerCount(server, 'request')) // deprecated

// emitter.setMaxListeners(n)
// По умолчанию EventEmitters будет выдавать предупреждение, если добавляются более 10 слушателей для конкретного события.
// Это полезное значение по умолчанию, которое помогает находить утечки памяти. Очевидно, что не все события должны
// быть ограничены только 10 обработчиками. Метод emitter.setMaxListeners() позволяет изменить ограничение для конкретного
// экземпляра EventEmitter. Значение может быть установлено до Infinity (бесконечности) (или 0), чтобы указать,
// неограниченное количество обработчиков. Возвращает ссылку на EventEmitter, так что вызовы могут быть выстроены в цепочку.
// server.setMaxListeners(20);
server.on('set1',()=>{})
server.on('set1',()=>{})
server.on('set1',()=>{})
server.on('set1',()=>{})
server.on('set1',()=>{})
server.on('set1',function test(){})

// server.on('set2',()=>{})
// server.on('set2',()=>{})
// server.on('set2',()=>{})
// server.on('set2',()=>{})
// server.on('set2',()=>{})
// server.on('set2',()=>{})

// server.emit()

// Показывает текущее значение максимального количества обработчиков для EventEmitter ,которое либо задается с помощью
// emitter.setMaxListeners(n) либо устанавливается по умолчанию с помощью EventEmitter.defaultMaxListeners.
// console.log( server.getMaxListeners())

// Показывает массив со списком событий, на которые генератор событий зарегистрировал обработчиков.
// Значения в массиве будут строками или символами.
// console.log(server.eventNames());

// console.log( server.listeners('set1'))
// Возвращает копию массива обработчиков для события с названием eventName.
// console.log(server.listeners('request'));

// emitter.removeListener(eventName, listener)
// Удаляет указанный обработчик из массива обработчиков для события с названием eventName.
// emitter.off(eventName, listener)

const callback = (stream) => console.log('someone connected!');
server.on('connection', callback);

// console.log(server.removeListener('connection', callback));

// emitter.removeAllListeners([eventName])
// Удаляет всех, или конкретных обработчиков из указанного eventName. Обратите внимание, что неправильно удалять
// обработчиков где-либо, в коде особенно, когда экземпляр класса EventEmitter был создан каким-либо другим компонентом
// или модулем (например, сокеты или файловые потоки).
// Возвращает ссылку на EventEmitter и таким образом вызовы могут быть выстроены в цепочку
// console.log(server.removeAllListeners('request'));
// console.log(server.listeners('request'));

//==========================================================================================

// server.emit('error'); // throw TypeError
// server.emit('error',new Error()); // throw err

// server.on('error', () => {});
// server.emit('error');

// server.on('error', (error) => console.log(error));
// server.emit('error',new Error('500 error'));

//===============================================================================================
//Утечка памяти
// function Request() {
//     const self = this;
//     this.bigData = new Array(1e6).join('*');
//     this.send = data => console.log(data);
//     this.onError = () => self.send('Sorry we have a problem');
// }
const heapArr = []

// const intervalId = setInterval(() => {
//     const request = new Request(); // Создается новый объект. В реале может быть запрос от клиента
//     // console.log(process.memoryUsage().heapUsed); // выводится текущее поедание памяти
//     heapArr.push(Math.round(process.memoryUsage().heapUsed / (1024 * 1024)))
//     console.log(heapArr);
//     if(heapArr.length > 1e3){
//         console.log(Math.min(...heapArr), Math.max(...heapArr));
//         clearInterval(intervalId)
//     }
// }, 0);

//=================================================================================================

const db = new EventEmitter(); // объект источника данных
// Который может посылать какую-то информацию, которую Request в свою очередь может пересылать клиенту

// function Request() {
//     const self = this;
//     this.bigData = new Array(1e6).join('*');
//     this.send = data => console.log(data);
//     db.on('data', info => self.send(info)); // db.emit
// }

// const intervalId = setInterval(() => {
//     const request = new Request(); // Создается новый объект. В реале может быть запрос от клиента
//     // console.log(process.memoryUsage().heapUsed); // выводится текущее поедание памяти
//     heapArr.push(Math.round(process.memoryUsage().heapUsed / (1024 * 1024)))
//     console.log(heapArr);
//     if(heapArr.length > 1e3){
//         console.log(Math.min(...heapArr), Math.max(...heapArr));
//         clearInterval(intervalId)
//     }
//     // console.log(db)
// }, 0);

//=====================================================================================================

// const db = new EventEmitter(); // объект источника данных
// Который может посылать какую-то информацию, которую Request в свою очередь может пересылать клиенту

function Request() {
    const self = this;
    this.bigData = new Array(1e6).join('*');
    this.send = data => console.log(data);
    const onData = info => self.send(info);
    this.end = () => db.removeListener('data', onData);
    db.on('data', onData);
}

const intervalId = setInterval(() => {
    const request = new Request(); // Создается новый объект. В реале может быть запрос от клиента
    request.end();
    // console.log(process.memoryUsage().heapUsed); // выводится текущее поедание памяти
    heapArr.push(Math.round(process.memoryUsage().heapUsed / (1024 * 1024)))
    console.log(heapArr);
    if(heapArr.length > 1e3){
        console.log(Math.min(...heapArr), Math.max(...heapArr));
        clearInterval(intervalId)
    }
    // console.log(db);
}, 0);