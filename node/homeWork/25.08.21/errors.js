/** Распространение ошибок и перехват */
let err = new Error('Error: 1234')
const fs = require('fs');
/** Любое использование throw механизма JavaScript вызовет
 * исключение, которое необходимо обработать с помощью,
 * try catch иначе процесс Node.js завершится немедленно */
// try {
//     const m = 1;
//     const n = m + z;
// } catch (err) {
//     // Handle the error here.
//     console.error(err)
//
// }

/** Обратные вызовы при первой ошибке */

/**
 * В этом шаблоне функция обратного вызова передается методу в качестве
 * аргумента. Когда операция завершается или возникает ошибка, вызывается
 * функция обратного вызова с Error о бъектом (если есть), переданным в
 * качестве первого аргумента.
 */


// function errorFirstCallback(err, data) {
//     if (err) {
//         console.error('There was an error', err);
//         return;
//     }
//     console.log(data);
// }

// fs.readFile('/some/file/that/does-not-exist', errorFirstCallback);
// fs.readFile('/some/file/that/does-exist', errorFirstCallback);

/** Error */

/**  Экземпляры объекта Error выбрасываются при возникновении ошибок во время выполнения */


/**
 error.code Свойство является строкой метка,
 которая определяет вид ошибки. error.code
 это наиболее стабильный способ выявления ошибки.
 */

// console.error(err.code);

/**
 error.message свойство является строка описания ошибки
 */

// console.error(err.message)

/**
 * error.stack Свойство является строка, описывающая точку
 * в коде, при которой Error был реализованным.
 */

/**
 * JavaScript try…catch механизм не может быть использован для перехвата ошибок ,
 * генерируемых асинхронным API. Распространенная ошибка новичков - попытаться
 * использовать throw обратный вызов внутри ошибки:
 */

// try {
//     fs.readFile('/some/file/that/does-not-exist', (err, data) => {
//         // Mistaken assumption: throwing here...
//         if (err) {
//             throw err;
//         }
//     });
// } catch (err) {
//     // This will not catch the throw!
//     console.error(err);
// }

/**
 * Это не сработает, потому что переданная функция обратного вызова
 * fs.readFile() вызывается асинхронно. К моменту вызова обратного
 * вызова окружающий код, включая try…catch блок, уже завершится.
 */

// new Promise((resolve, reject) => {
//     fs.readFile('/some/file/that/does-not-exist', (e, data) => {
//         // Mistaken assumption: throwing here...
//         if (e) {
//            throw new e;
//         }
//     });
// })
//     .then()
//     .catch(console.error);