/*
  https://habr.com/ru/post/479048/
  https://www.youtube.com/playlist?list=PLrwNNiB6YOA18XANsFe0CnizlhYKjJT0f
*/

/*
  Потоки позволяют обмениваться данными небольшими частями, что в свою очередь дает возможность в своей работе не расходовать много памяти.
  Всего есть четыре видла потоков:
    Readable — поток, который предоставляет данные на чтение.
    Writable — поток, в который данные можно записывать.
    Duplex — поток, из которого можно как читать данные (Readable),
      так и записывать в него (Writable), при этом процесс чтения и записи просиходит независимо друго от друга.
    Transform — разновидность Duplex потоков, которые могут изменять данные при их записи и чтении в/из потока
      (чаще используется как промежуточное звено в цепочке передачи данных).

  Потоки работают со строками и буферами, но с опцией objectMode можно работать с объектами.

  Потоки хранят данные в своем внутреннем буфере.
  Размер буфера можно указать через параметр highWaterMark, который можно задать в конструкторе класса.

  Основная их концепция — это обработка данных по частям, что очень удобно и не требует расходов больших ресурсов.

  В Readable потоке данные буферизируются, когда над ним вызвается метод push(data),
  и остаются в буфере до тех пор, пока их не прочитают, вызвав метод read().
  Как только общий размер внутреннего буфера Readable потока достигнет порогового значения,
  указанного в highWaterMark, поток временно прекратит чтение данных.

  Для Writable буферизация происходит во время вызова над ним метода write(data).
  Метод вернет true, пока размер буфера не достиг значения highWaterMark, и false, когда буфер переполнен.
  При использовании метода pipe(), как раз в этот момент он «останавливает» чтение данных,
  ожидает событие «drain», после чего передача данных возобновляется.

  Потоки наследуются от EventEmitter это дает потокам возможность работы с эвентами.

  Состояние flowing или paused потока Readable

  flowing — данные поступают непрерывно и как можно быстро для процесса, который их считывает.
  paused — режим по умолчанию для всех типов потоков, данные передаются только если их явно запросили — явный вызов метода read()
  (метод read() неявно вызывается «внутри» метода pipe()).

  Состояние flowing === true — автоматически если:
    данные передаются другим потокам через метод pipe().
    и/или у него есть обработчик события 'data'.
    и/или над ним вызван метод resume().

  Из состояния flowing в paused можно переключиться (flowing === false):
    если «разорвем» связь между источником данных и их потребителем (Readable.pipe(Writable).
    Readable.unpipe(Writable)), и/или удалим обработчик события 'data'.
    или вызовем метод Readable.pause().

  На момент инициализации класса Readable flowing === null, то есть еще не реализован механизм чтения данных, и данные не генерируются.

  Эвенты:

    Readable:
      !data - стрим отдает какие-то данные из своего буфера.
      !readable - в стриме есть данные которые он готов отдать, также !выполняетеся когда данные закончились, !перед end.
      close - стрим или привязаный ресурс закрывается, последний эвент.
      end - данные закончились, больше передавать нечего.
      error - ошибка.
      pause - вызов rStream.pause() и readableFlowing !false.
      resume - вызов rStream.resume() и readableFlowing !true.

    Writable:
      close - close
      drain - когда заполнеынй внутрений буфер стрима опустошится.
      error - ашибка.
      finish - вызов wStream.end() - сигнал о том что данные больше записываться не будут.
      pipe - вызов rStream.pipe(wStream) - возвращает rStream.
      unpipe - вызов rStream.unpipe(wStream) - возвращает rStream.
*/

const {
  Readable,
  Writable,
  Duplex,
  PassThrough,
  Transform,
  pipeline
} = require('stream');

const {stdin, stdout} = require('process');
const {createReadStream, createWriteStream} = require('fs');

/*
  Custom read example

  const arr = new Array(20).fill(0).map((_, i) => `${i}`);

  class MyRead extends Readable {
    constructor (dataToRead) {
      super({ objectMode: true }); //encoding: 'UTF-8' => Converts buffer to string
      this.dataToRead = dataToRead;
      this.index = 0;
    }

    _read () {
      if (this.index <= this.dataToRead.length) {
        const chunk = {
          data: this.dataToRead[this.index],
          index: this.index,
        };

        this.push(chunk);
        this.index += 1;
      } else {
        this.push(null);
      }
    }
  }

  const read = new MyRead(arr);

  read.on('data', data => console.log('Stream event "DATA =>', data));

  read
    .on('error', err => {
      console.error(err)
    })
    .on('pause', () => {
      console.log('stream flow is paused')
    })
    .on('resume', () => {
      console.log('stream flow is resumed')
    })

  read.pause() //flowin = false
    setTimeout(() => {
      read.on('data', data => {
        console.log(data)
      })
    read.resume();
      // если бы не .pause() то flowing = true
      // console.log(read.readableFlowing)
      //flowin = true
  }, 2000);

*/

/*
  Custom write example

  class MyWrite extends Writable {
    constructor () {
      super();
    }

    _write (chunk, encoding, callback) {
      process.stdout.write(chunk + '\n');
      callback();
    }
  }

  const writer = new MyWrite();

  for (let i = 0; i < 1000; i++) {
    writer.write(`${i}`)
  }

  const readStream = createReadStream('./data.views');
  const writeStream = createWriteStream('./copy.copy');

  readStream.on('data', chunk => {
    const result = writeStream.write(chunk)
    console.log(chunk.length)
    if (!result) {
      console.log('backpressure')
      readStream.pause()
    }
  });

  readStream.on('error', err => {
    console.log('An err has occured')
    console.error(err)
  });

  readStream.on('end', () => {
    writeStream.end()
  });

  writeStream.on('drain', () => {
    console.log('drained')
    readStream.resume()
  });

  writeStream.on('close', () => {
    process.stdout.write('file copied \n')
  });

  readStream.pipe(writeStream) - альтернатива всему этому огороду.
*/

/*
  Transform stream
  Этот стрим является Duplex стримом. Он нужен для преобразования порции данных и отправки дальше по цепочке. Его можно реализовать таким же способом, как и остальные стримы.
  _transform — это приватный метод, который вызывается внутренними методами класса Transform для преобразования порции данных.
  Он принимает 3 параметра:
    chunk (часть данных),
    encoding (кодировка, если chunk это строка),
    callback (функция, которая вызывается после успешной или неудачной записи).

  С помощью этого метода и будет происходить изменение порции данных.
  Внутри этого метода мы можем вызвать transform.push() ноль или несколько раз, который фиксирует изменения.
  Когда мы завершим преобразование данных, мы должны вызвать callback, который отправит все, что мы добавляли в transform.push().
  Первый параметр этой callback функции — это ошибка. Также мы можем не использовать transform.push(),а отправить измененные данные вторым параметром в функцию callback (пример: callback(null, data)).

  stream.pipe — этот метод используется для соединения Readable стрима с Writable стримом, а также для создания цепочек стримов. Это значит, что мы можем считывать часть данных и передавать в следующий стрим для обработки, а потом в следующий и т д.


  class CounterReader extends Readable {
    constructor(opt) {
      super(opt);

      this._max = 1000;
      this._index = 0;
    }

    _read() {
      this._index += 1;

      if (this._index > this._max) {
        this.push(null);
      } else {
        const buf = Buffer.from(`${this._index}`, 'utf8');

        this.push(buf);
      }
    }
  }

  class CounterWriter extends Writable {
    _write(chunk, encoding, callback) {
      console.log(chunk.toString());

      callback();
    }
  }

  class CounterTransform extends Transform {
    _transform(chunk, encoding, callback) {
      try {
        const resultString = `*${chunk.toString('utf8')}*`;

        callback(null, resultString);
      } catch (err) {
        callback(err);
      }
    }
  }

  const counterReader = new CounterReader({ highWaterMark: 2 });
  const counterWriter = new CounterWriter({ highWaterMark: 2 });
  const counterTransform = new CounterTransform({ highWaterMark: 2 });

  counterReader.pipe(counterTransform).pipe(counterWriter);
*/

/*
  Duplex stream
  Он объединяет в себе Readable и Writable стримы, то есть мы должны написать реализацию двух методов _read и _write.
  Здесь нам интересны 2 параметра, которые мы можем передать в конструктор,
  это readableHighWaterMark и writableHighWaterMark,
  которые позволяют нам указать размер внутреннего буфера для Readable, Writable стримов соответственно.
*/

/*
  Написать свой файловый стрим на чтение с возможностью
  указания ограничения скорости чтения в КВ(килобайтах). Прости...
  Пример использования:
  const readable = createReadableStreamWithThrottle('./data/test.tar', {throttle: 1000})
  const writeable = createWriteStream('./data/test.tar.copy');
  readable.pipe(writeable);

  const { Readable } = require('stream');
  const { Buffer } = require('buffer');
  const fs = require('fs');

  const writeable = fs.createWriteStream('./data/test2.txt');

  const kIsPerformingIO = Symbol('kIsPerformingIO');
  const kFs = Symbol('kFs');

  class MyReadable extends Readable {
      constructor(path, { throttle }) {
          super();
          this[kFs] = fs;
          this.throttle = throttle;
          this.path = path;
          this.fd = undefined;
          this.flags = 'r';
          this.mode = 0o666;
          this.timeshtamp = 0;
          this.start = 0;
          this.end = Infinity
          this.pos = 0
          this.bytesRead = 0

          this[kIsPerformingIO] = true;


          Readable.call(this, {});

          this[kFs].open(this.path, this.flags, this.mode, (er, fd) => {
              this.fd = fd;
              this.emit('open', fd);
              this.emit('ready');
              this.read();
          });

      }

      _read(n) {
          if (typeof this.fd !== 'number') {
              return this.once('open', function() {
                  this._read(n);
              });
          }

          const timeOut = this.check();

          n = this.pos !== undefined ?
              Math.min(this.end - this.pos + 1, n) :
              Math.min(this.end - this.bytesRead + 1, n);

          if (n <= 0) {
              this.push(null);
              return;
          }

          if(timeOut > 0) {
              setTimeout(() => {
                  this._read(n);
              }, timeOut)
              return;
          }

          const buf = Buffer.allocUnsafeSlow(n);
          this[kIsPerformingIO] = true;

          this[kFs]
              .read(this.fd, buf, 0, n, this.pos, (er, bytesRead, buf) => {
                  this[kIsPerformingIO] = false;
                      if (bytesRead > 0) {
                          if (this.pos !== undefined) {
                              this.pos += bytesRead;
                          }

                      this.bytesRead += bytesRead;

                      if (bytesRead !== buf.length) {
                          const dst = Buffer.allocUnsafeSlow(bytesRead);
                          buf.copy(dst, 0, 0, bytesRead);
                          buf = dst;
                      }
                          this.push(buf);
                          this.update(buf.length)

                      } else {
                      this.push(null);
                  }
              });
      }

      check () {
          const diff = Date.now() - this.timeshtamp;
          if(diff > 1000) {
              return 0;
          }
          if(this.count < this.throttle * 1024) {
              return 0
          }
          return 1000 - diff;
      }

      update (size) {
          this.count += size;
          if(Date.now() - this.timeshtamp > 1000) {
              this.count = 0;
              this.timeshtamp = Date.now();
          }
      }
  }

  function createReadableStreamWithThrottle(path, throttle) {
      const stream = new MyReadable(path, throttle);
      return stream;
  }

  const readable = createReadableStreamWithThrottle('./data/test.txt', { throttle: 1000 })
  readable.pipe(process.stdout);
*/

/*
  const{ Transform }=require('stream')
  const { createReadStream, createWriteStream } = require('fs');
  const readStream = createReadStream('./Node/stream/test');
  const writeStream = createWriteStream('./test2');

  class Test extends Transform{
    constructor ({throttle}) {
      super()
      this.throttle = throttle;
      this.timeshtamp = 0;
      this.count = 0;
    }

    _transform (chunk, encoding, callback) {

      const timeout = this.check()

      setTimeout(()=>{
        this.push(chunk);

        callback()
        this.update(chunk.length)
      },timeout)

    }

    check () {
      const diff = Date.now() - this.timeshtamp;

      if(diff > 1000) {
        return 0;
      }

      if(this.count < this.throttle * 1024) {
        return 0
      }

      return 1000 - diff;
    }

    update (size) {
      this.count += size;
      if(Date.now() - this.timeshtamp > 1000) {
        this.count = 0;
        this.timeshtamp = Date.now();
      }
    }
  }

  const test = new Test({throttle:10})

  readStream.pipe(test).pipe(writeStream);

*/
