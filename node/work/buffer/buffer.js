require('buffer');

/*
  1024 - 1кб.
  Все данные хранятся бинарно.
  https://habr.com/ru/company/ruvds/blog/348970/
  https://www.digitalocean.com/community/tutorials/using-buffers-in-node-js-ru
  https://nodejsdev.ru/doc/buffer/
  https://coderlessons.com/tutorials/kompiuternoe-programmirovanie/uznaite-node-js/node-js-bufery
*/

/* 
  Buffer - используется для работы с сырыми данными (байтами)
  Static:
  Buffer.alloc(size[, fill[, encoding]])
  Выделяет новый буфер указаного size(0<=size<require('buffer').kMaxLength)
  fill-опциональный параметр - чем заполнить буфер (<string> | <Buffer> | <Uint8Array> | <integer>)
  ecnoding-только если указан fill и он string-заполняет созданый буфер fill строкой в encoding кодировки, если fill && !string - ничего не делает

  const buff = Buffer.alloc(20)
  const secondBuff = Buffer.alloc(20, 'Some_value', 'utf8')
  const thirdBuffer = Buffer.alloc(20, 98)
  console.log(buff);
  console.log(secondBuff);
  console.log(thirdBuffer);
  console.log(buff.toString());
  console.log(secondBuff.toString());
  console.log(thirdBuffer.toString());
*/
/*=============================*/
/* 
  Buffer.allocUnsafe(size)
  +скорость -секьюрность
  Выделяет новый буфер указаного size с неизвестным содержимым из памяти(потенциально опасно так как в памяти может быть все что угодно)
  Идеальный вариант если делать копию
  
  Плохая запись плохо.
    const buff = Buffer.allocUnsafe(10);
    console.log(buff);
    console.log(buff.toString());
  Нормальная запись.
    const b = Buffer.allocUnsafe(200).fill(0);
    console.log(b);
  Копирование.
    const oldBuffer = Buffer.from('some data')'
    const bufferCopy = Buffer.allocUnsafe(oldBuffer.length);
    oldBuffer.copy(bufferCopy);
    console.log(oldBuffer.toString())'
    console.log(bufferCopy.toString());
*/
/*=============================*/
/* 
  Buffer.byteLength(string[, encoding]) : integer
  string - <string> | <Buffer> | <TypedArray> | <DataView> | <ArrayBuffer> | <SharedArrayBuffer>
  Возвращает число байтов небходимое для string в указаной encoding
  const a = '☃'
  console.log(Buffer.byteLength(a, 'utf8'));
  const b = Buffer.from(a);
  const c = Buffer.from(b);
  console.log(b.length);
  console.log(c.length);
*/

/* 
  Buffer.compare(buf1, buf2) : 0 | -1| 1
  Принимает 5 параметров:
    1. targetBuffer = Этот параметр содержит буфер, который будет сравниваться с другим буфером.
    2. targetStart = Он относится к начальному индексу, с которого начнется сравнение элементов целевого буфера. Его значение по умолчанию - 0.
    3. targetEnd = Он относится к индексу, до которого будут сравниваться элементы целевого буфера. Значение по умолчанию - 0.
    4. sourceStart = Индекс во входном буфере, с которого начнется сравнение значений. Значение по умолчанию - 0.5.
    5. sourceEnd = Индекс во входном буфере, до которого будет производиться сравнение значений. Значение по умолчанию - buffer.length.

  Возвращаемое значение: возвращает число, указывающее разницу в обоих буферах. Количество возвратов:
    0: Если они равны.
    1: Если buffer1 больше, чем buffer2, т.е. если буфер1 должен стоять перед буфером2 при сортировке.
    -1: Если buffer2 больше, чем buffer1, то есть если buffer2 должен стоять перед buffer1 при сортировке.
    
  Примеры:
    1.
      const buffer1 = Buffer.from('Geek');
      const buffer2 = Buffer.from('Geek');
      const op = Buffer.compare(buffer1, buffer2);
      console.log(op);
        
      const buffer1 = Buffer.from('GFG');
      const buffer2 = Buffer.from('Python');
      const op = Buffer.compare(buffer1, buffer2);
      console.log(op);
    2.
      const buffer1 = Buffer.from('GeeksOne');
      const buffer2 = Buffer.from('GeekTwo');
      // Печать: -1 как размер начального буфера1 из индекса 4 меньше размера buffer2
      const op = buffer1.compare(buffer2, 4);
      // Печать: 1 как размер буфера2, начиная с из индекса 5 меньше размера buffer1 начиная с 0-го индекса
      const op1 = buffer1.compare(buffer2, 0, 7, 5);
      console.log(op);
      console.log(op1);
*/
/*=============================*/
/* 
  Buffer.concat(list[, totalLength]) : Buffer
  Возвращает новый буфер склееный из массива list [Buffer|Uint8Array]
  totalLength-можно указать размер получившегося буфера, если > чем результат дописывается нулями
  const newBuff = Buffer.concat([
    Buffer.allocUnsafe(10),
    Buffer.allocUnsafe(10),
    Buffer.allocUnsafe(10),
    Buffer.allocUnsafe(10),
  ]);
  console.log(newBuff);
*/
/*=============================*/
/* 
  Buffer.isBuffer(obj) - Array.isArray(arr) : Boolean
  console.log(Buffer.isBuffer(Buffer.alloc(0)));
  console.log(Buffer.isBuffer([Buffer.alloc(0)]));
  console.log(Buffer.isBuffer([Buffer]));
*/
/*=============================*/

/* 
  Buffer.isEncoding(encoding) : boolean
  encoding - string
  Поддерживаемая ли кодировка

  console.log(Buffer.isEncoding('utf8'));
  console.log(Buffer.isEncoding('utf'));
  console.log(Buffer.isEncoding('utf16'));
  console.log(Buffer.isEncoding('utf16le'));
  console.log(Buffer.isEncoding('hex'));
*/

/* 
  Buffer.from(array|arrayBuffer|buffer|object|string)
  Метод Buffer.from () создает новый буфер, заполненный указанной строкой, массивом или буфером.
  Возвращает buffer на основании масива битов в диапазоне 0-255
  либо номер юникода в 16ричном формате 0x5c,0x53
  либо номер в ascii таблице 32-126
*/

/* Instance Methods */
/*
  buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
  target:<Buffer> | <Uint8Array>
  ends:not inclusive
*/
/*=============================*/
/* 
  buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
  Копирует из buf в target
  Примеры: 
    1
      const buf1 = Buffer.allocUnsafe(4)
      const buf2 = Buffer.allocUnsafe(13).fill('!')
      for (let i = 0; i < 4; i++) {
        buf1[i] = i + 97
      }
      buf1.copy(buf2, 5, 0, 3)
      console.log(buf2.toString())
    2
      const buf1 = Buffer.from('abcdefghijkl');
      const buf2 = Buffer.from('HELLO');
      buf2.copy(buf1, 2);
      console.log(buf1.toString());
*/
/*=============================*/
/*
  buf.entries() : iterator
  Итератор вида [index,byte]
  for (ent of Buffer.allocUnsafe(5).entries()) {
    console.log(ent)
  } 
*/
/*=============================*/
/* 
  buf.equals(otherBuffer):boolean
  сравнение буферов
  const a = Buffer.alloc(10)
  const b = Buffer.alloc(10)
  const c = Buffer.alloc(10).fill(2)
  console.log(a.equals(b))
  console.log(a.equals(c))
  console.log(c.equals(b))
  console.log(c.equals(c))
*/
/*=============================*/
/* 
  buf.fill(value[, offset[, end]][, encoding]):buf
  value <string> | <Buffer> | <Uint8Array> | <integer>
  заполняет буфер указаным value
  encoding : кодировка в строковом виде, только если value = string
  аналог array.fill(), но с возможностью указывать диапазон где будет заполнение
  console.log(Buffer.alloc(25).fill('alo', 5, 8, 'utf8'))
*/
/*=============================*/
/* 
  buf.includes(value[, byteOffset][, encoding]): boolean
  value <string> | <Buffer> | <Uint8Array> | <integer> 
  encoding : кодировка в строковом виде, только если value = string
  byteOffset:отступ
  Есть ли value в buf

  const buf = Buffer.alloc(9, 'alo');
  console.log(buf.includes('alo'));
  console.log(buf.includes('oal'));
  console.log(buf.includes('loa'));
  console.log(buf.includes('aloo'));
  console.log(buf.includes('aloaloal'));
  console.log(buf.includes('aloaloalo'));
  console.log(buf.includes('aloaloaloa'));
*/
/*=============================*/
/* 
  buf.keys():iterator
  возвращает итератор с индексами
  const buf = Buffer.alloc(9, 'alo')
  for (const obj of buf.keys()) {
    console.log(obj)
  }
*/
/*=============================*/
/* 
  buf.lastIndexOf(value[, byteOffset][, encoding])
  const buf = Buffer.alloc(9, 'alo');
  console.log(buf.lastIndexOf('a'));
  console.log(buf.lastIndexOf('a', 1));
  console.log(buf.lastIndexOf('o', 3));
  console.log(buf.lastIndexOf('alo', 1));
  console.log(buf.lastIndexOf('ab'));
  console.log(buf.lastIndexOf(97)); // 97=a
*/
/*=============================*/
/* 
  buf.write(string[, offset[, length]][, encoding]):integer
  записывает в буфер string в кодировке encoding,
  с помощью offset можно указать сдвиг от начала
  length:максимальное количество байт для записи от offset
  const buff = Buffer.alloc(6);
  console.log(buff);
  buff.write('abc');
  buff.write('abc', 3);
  console.log(buff);
*/
/*=============================*/
/* 
  buf.slice([start[, end]])|buf.subarray([start[, end]])
  Возвращает буфер который ссылается на ту же память что и источник
  Изменения в одном затронут изменения в другом
  Грубо говоря частичная копия буфера в нужном отрезке по ссылке

  const a = Buffer.alloc(10).fill('abzxcasdwqer')
  console.log(a)
  const b = a.slice(0, 5)
  const c = a.slice(5, 10)
  b.write('aboba')
  c.write('abcde')
  const concated = Buffer.concat([b, c])
  console.log(concated)
  console.log(a)
*/
/*=============================*/
/* 
  buf.values():iterator
  возвращает значения буфера в беззнаковом виде
  const a = Buffer.alloc(10).fill('abzxcasdwqer')

  for (const value of a.values()) {
    console.log(value)
  }

  for (const value of a) {
    console.log(value)
  }
*/
/*=============================*/
/* 
buf.toJson()
  Вовзращает JSON представление буфера в виде
  {"type":"Buffer","data":[0,1,2,3,4,5]}

  const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
  console.log(buf);
  console.log(buf.toJSON());
*/
/*=============================*/
/* 
  buffer.transcode(source, fromEnc, toEnc)
  Переводит данные из одной кодировки в другую
  достпуные кодировки 'ascii', 'utf8', 'utf16le', 'ucs2', 'latin1','binary'
  const a = Buffer.from('alovasa', 'utf16le')
  console.log(a)
  console.log(a.toString('utf16le'))
  const b = require('buffer').transcode(a, 'utf16le', 'utf8')
  console.log(b)
  console.log(b.toString())
*/