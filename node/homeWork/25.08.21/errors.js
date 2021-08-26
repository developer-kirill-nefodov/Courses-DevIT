/** Распространение ошибок и перехват */

/** Любое использование throw механизма JavaScript вызовет
 * исключение, которое необходимо обработать с помощью,
 * try catch иначе процесс Node.js завершится немедленно */
try {
    //code...
} catch (e) {
    console.error(e)
}

/** Обратные вызовы при первой ошибке */

/**
 * В этом шаблоне функция обратного вызова передается методу в качестве
 * аргумента. Когда операция завершается или возникает ошибка, вызывается
 * функция обратного вызова с Errorо бъектом (если есть), переданным в
 * качестве первого аргумента.
 */
const fs = require('fs');

function errorFirstCallback(err, data) {
    if (err) {
        console.error('There was an error', err);
        return;
    }
    console.log(data);
}

// fs.readFile('/some/file/that/does-not-exist', errorFirstCallback);
// fs.readFile('/some/file/that/does-exist', errorFirstCallback);

/** Error */

/**  Экземпляры объекта Error выбрасываются при возникновении ошибок во время выполнения */

/**
 error.code Свойство является строкой метка,
 которая определяет вид ошибки. error.code
 это наиболее стабильный способ выявления ошибки.
 */

// console.error(err.message)
/**
 * error.stackСвойство является строка, описывающая точку
 * в коде, при которой Error был реализованным.
 */
// console.error(err.stack)
