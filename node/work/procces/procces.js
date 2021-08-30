// Process

// Process - глобальный объект, экземпляр класса EventEmitter
/* одну программу Node.js, она работает как один процесс операционной системы (ОС),
который представляет экземпляр запущенной программы.
В рамках этого процесса Node.js выполняет программы на одном потоке. */

//const path = require('path/posix');
// const proc = require('process');

//console.log(proc.arch);
// Аналогично process.arch;

// console.log(proc.version); // выдаст нам версию текущего процесса (Ноды)

// console.log(proc.versions); // более полная инфа - о Ноде, движке V8 и тд

// console.log(proc.argv); // Возврат массива аргументов СLI, которые пришли при вызове процесса

/* proc.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
}); */

// console.log(proc.env);  // Возврат объекта, содержащий переменные окружения для текущего юзера
// При необходимости можем модернизировать этот объект своими переменными

// proc.env.newVariable = "someValue";

// console.log(proc.env);

// delete proc.env.newVariable // можем удалить нашу переменную

// Методы

//console.log(proc.memoryUsage()); // Возврат объекта с данными о памяти системы
// rss - основная память устройства heapTotal and heapUsed - память движка V8  external - память для объектов с++ в V8   arrayBuffers - память под буферы

// console.log(proc.cwd()); // получает текущую рабочую папку.

// console.log(proc.config); // конфиг движка и ноды

//   console.log(proc.title) // тайтл процесса

/* При нормальном завершении процесса, генерируетcя событие exit.
Код приложения может прослушивать это событие и, при его возникновении,
выполнять, в синхронном режиме, некие операции по освобождению ресурсов */

/* process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });*/

/* process.on('exit', function(code) {

    // Following code will never execute.
    setTimeout(function() {
       console.log("This will not run");
    }, 0);

    console.log('About to exit with code:', code);
 });
 console.log("Program Ended");*/

/* process.on('beforeExit', (code) => {
   console.log('Process beforeExit event with code: ', code);
 });

 process.on('exit', (code) => {
   console.log('Process exit event with code: ', code);
 });

 console.log('This message is displayed first.');*/

const path = require('path');

function getPath (){

    return __filename;
}

// console.log(getPath());

// Написать функцию которая принимает пути, в случае одного параметра просто возвращает
// развлезолвленный путь, двух элементов разлвлез+олвленный путь между ними.

// function getPath2(p1, p2){

//     if(!p2){
//         return path.resolve(p1);
//     }

//     return path.resolve(p1, p2);
// }

// console.log(getPath2(__filename));

const fs = require('fs');

// findFile(fileName, dirPath = '__dirname', cb: (err, path|null)=>{})

// dirCopy(dirSource, dirTarget, cb:(err)=>{})

let source = '/home/developer/Downloads/source';
let dest = '/home/developer/Downloads/dest';

function dirCopy(dirS, dirT){

  fs.copyFile(dirS, dirT, function(err){
      if(err) throw new Error(err);

    console.log("Directory has been copied");
  })
}

dirCopy(source, dest);