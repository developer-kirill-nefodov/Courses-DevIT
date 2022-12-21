// Модуль обеспечивает интерфейс для считывания данных из Readable потока (например process.stdin) на одну строку за один раз. Доступ к нему можно получить, используя:
// Экземпляры readline.Interfaceкласса создаются с использованием readline.createInterface()метода. Каждый экземпляр связан с одним потоком с возможностью input чтения и одним потоком с возможностью output записи . outputПоток используется для печати приглашений для ввода пользователя , который приходит на, и читается, в inputпотоке.

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// ========================================================================

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });
// ========================================================================

// rl.close()
// ========================================================================
// rl.pause()
// 'pause'Событие генерируется , когда один из следующих случаев:
// inputПоток приостановлен.
// inputПоток не остановился и получает 'SIGCONT'событие. (См. События 'SIGTSTP'и 'SIGCONT'.)

// rl.on('pause', () => {
//     console.log('Readline paused.');
// });

// ========================================================================
// rl.resume()
// 'resume' Событие генерируется всякий раз , когда input поток возобновляется.

// 'resume'Событие генерируется всякий раз , когда inputпоток возобновляется.

// rl.on('resume', () => {
//     console.log('Readline resumed.');
// });

// ========================================================================
// rl.setPrompt('dasdas')
// rl.prompt()
// rl.setPrompt(prompt)
// rl.getPrompt()

// rl.question(query[, options], callback)

// rl.question('What is your favorite food? ', (answer) => {
//     console.log(`Oh, so your favorite food is ${answer}`);
//   });

// rl.write(data[, key])
// ========================================================================
// rl.line
// 'line'Событие генерируется всякий раз , когда input поток получает конца-линии (вход \n, \rили \r\n). Обычно это происходит, когда пользователь нажимает Enter
// rl.on('line', (input) => {
//     console.log(`Received: ${input}`);
// });
// rl.cursor
// ========================================================================

// 'SIGINT'Событие генерируется всякий раз , когда input поток получает Ctrl+C
// rl.on('SIGTSTP', () => {
// // This will override SIGTSTP and prevent the program from going to the
// // background.
//     console.log('Caught SIGTSTP.');
// });

// ========================================================================
// 'SIGTSTP'Событие генерируется , когда input поток получает Ctrl + Z входной сигнал
// rl.on('SIGINT', () => {
//     rl.question('Are you sure you want to exit? ', (answer) => {
//         if (answer.match(/^y(es)?$/i)) rl.pause();
//     });
// });

// ========================================================================

// 'history'Событие генерируется всякий раз , когда массив истории изменился.
// rl.on('history', (history) => {
//     console.log(`Received: ${history}`);
// });


// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: 'OHAI> '
// });

// rl.prompt();

// rl.on('line', (line) => {
//   switch (line.trim()) {
//     case 'hello':
//       console.log('world!');
//       break;
//     default:
//       console.log(`Say what? I might have heard '${line.trim()}'`);
//       break;
//   }
//   rl.prompt();
// }).on('close', () => {
//   console.log('Have a great day!');
//   process.exit(0);
// });
