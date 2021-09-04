// 1. findFile(fileName, dirPath = '__dirname', cb: (err, path|null)=>{})
const path = require('path');
const fs = require('fs');


/** fs.readdir(path[, options], callback)
 * Читает содержимое каталога. Обратный вызов получает два аргумента, (err, files)
 * где files - массив имен файлов в каталоге, исключая '.'и '..'
 *
 options <строка> | <Объект>
 encoding <string> По
 умолчанию: 'utf8'
 withFileTypes <boolean> По умолчанию: false
 */

/**
 *
 * */

function findFile(fileName, dirPath, cb) {
    fs.readdir(dirPath, {withFileTypes: true}, (err, files) => {

        try {
            if (files.find((v) => v.name === fileName) !== undefined) {
                cb(null, path.join(dirPath, fileName));
                return;
            }
            let flag = false;
            files.forEach((v) => {
                if (v.isDirectory()) {
                    findFile(fileName, path.join(dirPath, v.name), cb);
                    flag = true;
                }
            });
            if (!flag) cb(null, null);
        }catch (e) {
            throw new Error(e)
        }

    });
}


// 2. dirCopy(dirSource, dirTarget, cb:(err)=>{})

function dirCopy(dirSource, dirTarget, cb) {
    fs.cp(dirSource, dirTarget, {recursive: true}, cb);
}

// dirCopy("files/", "files_copy/", (err) => {
//     if (err) throw new Error(err);
// });