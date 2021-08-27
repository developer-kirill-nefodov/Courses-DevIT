/** Распространение ошибок и перехват */
let err = new Error('Error: 1234')
/** Любое использование throw механизма JavaScript вызовет
 * исключение, которое необходимо обработать с помощью,
 * try catch иначе процесс Node.js завершится немедленно */
try {
    let error = new Error('Some error');
    error.name = 'My Error';
    error.customProperty = 'some value';
    // noinspection ExceptionCaughtLocallyJS
    // throw error;
} catch (e) {
    console.log(e)
}

/** Обратные вызовы при первой ошибке */

/**
 * В этом шаблоне функция обратного вызова передается методу в качестве
 * аргумента. Когда операция завершается или возникает ошибка, вызывается
 * функция обратного вызова с Error о бъектом (если есть), переданным в
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

// console.error(err.code);

/**
 error.message свойство является строка описания ошибки
 */

// console.error(err.message)
/**
 * error.stack Свойство является строка, описывающая точку
 * в коде, при которой Error был реализованным.
 */

// console.error(err.stack)
function a() {
    //code...
}

function b() {
    //code...
    // while (true) {
    //     x++
    // }
}

function c() {
    throw new Error('Error:c')
}

try {
    a();
    b();
    c();
} catch (e) {
    // Выводит 1 или 2 (если не произошло никаких других ошибок)
    // console.log(e.code);
    console.log(e.message);
    console.log(e.stack);
}