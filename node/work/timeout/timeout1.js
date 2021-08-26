// Timeout
// создание - setTimeout(), остановка - clearTimeout()

// const t1 = setTimeout(() => console.log(`timeout`), 1000);

// clearTimeout(t1);

// Immediate - выполняется в конце текущего цикла событий
// создание - setImmediate(), остановка - clearImmediate()

// console.log('before immediate');

// setImmediate(() => {
//   console.log(`immediate`);
// });

// console.log('after immediate');

// Interval
// создание - setInterval(), остановка - clearInterval()

// const interval = setInterval(() => {
//   console.log('interval');
// }, 1000);

// setTimeout(() => clearInterval(interval), 5000);

// рекурсивный Timeout вместо Interval

// let timerId = setTimeout(function tick() {
//   console.log('tick');
//   timerId = setTimeout(tick, 1000);
// }, 1000);

// ref() и unref()
// вызов ref указывает, чтобы цикл событий не заканчивался, пока таймер не закончит свою работу
// вызов unref делает противоположное
// по умолчанию ref

// const timerObj = setTimeout(() => {
//   console.log('will i run?');
// });

// timerObj.unref();

// setImmediate(() => {
//   timerObj.ref();
// });

// hasRef - возвращает значение ref

// console.log(setTimeout(() => console.log('timeout'), 1000).hasRef());

// refresh - обновляет таймер

// const t1 = setTimeout(() => console.log("t1"), 5000);
// setTimeout(() => t1.refresh(), 3000);