const path = require('path');

// basename - возвращает последнюю часть пути который ему передают
// quux.views
// const basePartPath =  path.basename('/foo/bar/baz/asdf/quux.views');
// console.log(basePartPath);

// dirname() -  возвращает место где лежит последний файл
// const dirPath = path.dirname("/foo/bar/baz/asdf/quux");
// console.log(dirPath);

// extname() - возвращает расширение либо пустую строку
// const exampleExt = path.extname('/usr/bin/tex.txt');
// console.log(exampleExt);

// isAbsolute -  проверяет является ли путь абсолютным
// console.log(path.isAbsolute('/asas.views'));

// join - объединяет пути
// const concatPath = path.join('/home', 'Documents', 'Projects', '..');
// console.log(concatPath);

// normalize - нормализирует(резолвит) пути
// const normalizePath = path.normalize('/foo/bar//baz/asdf/quux/..');
// console.log(normalizePath);

// relative - возвращает относительный путь между указанными путями
// const relative = path.relative('/home/Documents/Projects', '/home');
// console.log(relative);

// resolve - без комментариев возвращает абсолютный путь к текущему файлу
// c параметрами возвращает либо абсолютный путь до текущей директории + путь указанный в аргументах
// либо аргумент
// const absolutePath = path.resolve();
// console.log(absolutePath);

// parse - создаёт объект пути
// const currentPathObject = path.parse(path.resolve());
// console.log(currentPathObject);
// format - возвращает объект пути
// const pathFromParse = path.format(currentPathObject);
// console.log(pathFromParse);

// свойства
// отображается платформо зависимый path-delimiter
// console.log(path.delimiter);
// sep -  доступ к разделителю папок
// console.log(path.sep);

// специфичные вещи
// path.win32 - реализация методов path под Windows
// path.posix - реализация методов path под POSIX