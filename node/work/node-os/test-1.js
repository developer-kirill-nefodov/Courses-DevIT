/** test-1 */
const os = require('os');

// freemem() количество свободнай памяти // os.totalmem()

console.log(`объем общей ОЗУ: ${os.totalmem()}, 
процентное соотношение: ${os.freemem()*100/os.totalmem()}!!!`)

/** test-2 */
console.clear()
console.log(`
Архитектура: ${os.arch()},
Версия: ${os.version()},
Тип: ${os.type()},
логических ядрах: ${JSON.stringify(os.cpus())},
пользователе: ${JSON.stringify(os.userInfo())}
`)