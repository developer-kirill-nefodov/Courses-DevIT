// Zlib
// Модуль отвечает за компрессию (сжатие)

const {
  createGzip,
  createUnzip,
  createBrotliCompress,
  createBrotliDecompress,
  createDeflate,
  createInflate
} = require('zlib');

const {pipeline} = require('stream');

const {
  createReadStream,
  createWriteStream,
} = require('fs');

// Пример сжатия файла алгоритмом Gzip
/*GZIP обеспечивает сжатие без потерь, иными словами, исходные данные можно полностью восстановить при распаковке.
Он основан на алгоритме DEFLATE, который использует комбинацию алгоритма LZ77 и алгоритма Хаффмана*/

// const gzip = createGzip();
// const source = createReadStream('sample-gzip.views');
// const destination = createWriteStream('sample-gzip.views.gz');

// pipeline(source, gzip, destination, (err) => {
//   if (err) if(err) throw new Error(err);
// });

// Декомпрессия файла в начальное состояние

// const unzip = createUnzip();
// const source = createReadStream('sample-gzip.views.gz');
// const destination = createWriteStream('sample2-gzip.views');

// pipeline(source, unzip, destination, (err) => {
//   if(err) throw new Error(err);
// })

// Поговорим о скорости

/*Gzip - далеко не самый лучший метод сжатия, однако он обеспечивает хороший компромис между скоростью и степенью сжатия
Сжатие и распаковка быстрые, степень сжатия относительно высокая. Большой плюс - поддерживается всеми современными браузерами
Является стандартом современного интернета, на него приходится около 80% всех сжатых HTTP-ответов.
Сам алгоритм основан на повторениях, так что чем больше в исходном файле повторяющихся строк, тем более эфективным будет сжатие
Средняя степень сжатия - 2,8*/

// Компрессия алгоритмом Бротли

// const brotli = createBrotliCompress();
// const source = createReadStream('sample-brotli.views');
// const destination = createWriteStream('sample-brotli.views.br');
//
// pipeline(source, brotli, destination, (err) =>{
//   if(err) throw new Error(err);
// })

// Декомпрессия алгоритмом Бротли

// const brotli = createBrotliDecompress();
// const source = createReadStream('sample-brotli.views.br');
// const destination = createWriteStream('sample2-brotli.views');

// pipeline(source, brotli, destination, (err) =>{
//   if(err) throw new Error(err);
// })

/*
Алгоритм Brotli в 2012 году представлен Гуглом
Brotli - Сжатие лучше, чем у Gzip, но скорость при максимальной компрессии настолько низкая, что выигрыш от сжатия контента полностью нивелируется
Поддерживается большинством современных браузеров. Средняя степень сжатия - в 3,1 раза*/

// Deflate/Inflate

// const def = createDeflate();
// const source = createReadStream('sample-deflate.views');
// const destination = createWriteStream('sample-deflate.views.zz')

// pipeline(source, def, destination, (err) =>{
//   if(err) throw new Error(err);
// })

// Декомпрессия

// const def = createInflate();
// const source = createReadStream('sample-deflate.views.zz');
// const destination = createWriteStream('sample2-deflate.views');

// pipeline(source, def, destination, (err) =>{
//   if(err) throw new Error(err);
// })

/* методы сжатия gzip или deflate основаны на одинаковом алгоритме, разница лишь в том, что
Deflate это по сути формат сжатых данных, а gzip - формат файла, который был сжат методом Deflate*/


// Вариант с промисом

// const {promisify} = require('util');
// const pipe = promisify(pipeline);

// async function compress(input, output){

//   const gzip = createGzip();
//   const source = createReadStream(input);
//   const destination = createWriteStream(output);
//   await pipe(source, gzip, destination);
// }

// compress('sample-gzip.views', 'sample-gzip.gz').catch((err)=>{
//   console.error('Some Error Happend: ', err);
//   process.exitCode = 1;
// });

// Что насчет памяти:

// Важно знать, что все API интерфейсы zlib, кроме синхронных конечно, используют внутренний поток Ноды.
// Это может вызвать негативные эффекты и ограничение производительность некоторых апок
// Нужно помнить, что создание большого количества zlib обьектов одновременно, может вызвать большую нагрузку на ОЗУ

// Пример того, как делать не надо из доки

/*const payload = Buffer.from('This is some data');

// WARNING: DO NOT DO THIS!
for (let i = 0; i < 30000; ++i) {
  zlib.deflate(payload, (err, buffer) => {});
}*/

// Flusing
/* Это возможность при сжатии вернуть максимально возможный объем вывода за счет снижения качества сжатия
Может быть полезно, когда данные должны быть доступны как можно скорее*/

// Упрощенный пример как использовать flush для записи сжатого частичного http-респонса клиенту

// const http = require('http');
// const zlib = require('zlib');

// http.createServer((request, response) => {
//   response.writeHead(200, { 'content-encoding': 'gzip' });
//   const output = zlib.createGzip();
//   let i;

//   pipeline(output, response, (err) => {
//     if (err) {
//       clearInterval(i);
//       response.end();
//       console.error('An error occurred:', err);
//     }
//   });

//   i = setInterval(() => {
//     output.write(`The current time is ${Date()}\n`, () => {
//       output.flush(); // в данном случае вызов метода flush позволит отдавать данные клиенту как только он будет готов их получить
//     });
//   }, 1000);
// }).listen(1337);

// Options

/*Мы можем (но не обязаны - НИ ОДНА опция не является обязательной по дефолту) передавать в метод компрессии определенные опции, например
level<integer> уровень компрессии. 1 - минмиальный, 9 - максимальный для gzip 11 - для brotli
chunkSize<integer> - размер чанки, по умолчанию 16*1024
Опции передаются в виде обьекта
*/

// https://youtu.be/mcTNM7x5oOQ?t=119

/*1. Создать 3 views файла размерами 1, 2, 3 MB (примерно), сжать и декомпрессировать каждый из них через gzip и brotli,
Написать функцию вида function compressedInfo(originalFilePath, compressedFilePath), которая показывает размеры исходного и сжатого файла
2. Сделать то же самое что и в первой задаче, но передав в качестве параметров уровень сжатия - сначала самый низкий 1, а затем максимальный
(9 для gzip, 11 для brotli) и сравнить результаты минимальной компрессии, дефолтной компрессии и максимальной компрессии.*/

// const zlib = require('zlib');
// const stream = zlib.createBrotliCompress({
//   params: {
//     [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
//   }
// });
// const source = createReadStream('sample-brotli.views');
// const destination = createWriteStream('sample-brotli.views.br');
//
// pipeline(source, stream, destination, (err) =>{
//   if(err) throw new Error(err);
// })
