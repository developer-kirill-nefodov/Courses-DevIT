setTimeout(
    () => console.log('[этап таймера:] Привет с setTimeout очереди'),
    5000);
console.log('[пример блокировки:] Начало блокировки на 3с');
const stopTime = Date.now() + 3000;
while (Date.now() < stopTime) {
}
console.log('[пример блокировки:] Конец блокировки на 3с');
//<---------------------------------------------------
setTimeout(() => console.log('[этап таймера:] Запуск setTimeout коллбека А'), 4500);
//<---------------------------------------------------
const http = require('http');
const server = http.createServer((req, res) => {
    res.end();
});
server.listen(8000);
const options = {hostname: '127.0.0.1', port: 8000};
const sendHttpRequest = () => {
    const req = http.request(options, () => {
        console.log('[этап ввода-вывода] Получен ответ от сервера HTTP');
        setTimeout(() => server.close(), 100);
    });
    req.end();
};
setTimeout(sendHttpRequest, 3000);

server.on('close', () => {
    console.log('[коллбеки close] HTTP сервер закрыт')
});
//<---------------------------------------------------
const fs = require('fs');
fs.readFile(__filename, (err, data) => {
    console.log('[этап ввода-вывода] Данные -->', data);
    setTimeout(() => console.log('[этап таймера:] Файл I/O коллбек с setTimeout()'), 0);
    setImmediate(() => console.log('[фаза проверки:] Файл I/O коллбек с setImmediate()'));
});
//<---------------------------------------------------
const EventEmitter = require('events');

class ImpatientEmitter extends EventEmitter {
    constructor() {
        super();
        process.nextTick(() => this.emit('event'));
    }
}

const emitter = new ImpatientEmitter();
emitter.on('event', () => console.log('process.nextTick пример'));