/**
https://nodejs.org/api/perf_hooks.html
https://runebook.dev/ru/docs/node/perf_hooks
https://blog.logrocket.com/experimental-node-js-testing-the-new-performance-hooks-31fcdd2a747e/
 */

/** Diagnostic report - записывает в файл диагностический отчет о текущем состоянии приложения.


Этот модуль обеспечивает реализацию подмножества API-интерфейсов W3C Web Performance, а также дополнительных
API-интерфейсов для измерения производительности, специфичной для Node.js.
 */

// const { PerformanceObserver, performance } = require('perf_hooks');
//
// const obs = new PerformanceObserver((items) => {
//     console.log(items.getEntries()[0].duration);
//     performance.clearMarks();
// });
// obs.observe({ type: 'measure' });
// performance.measure('Start to Now');
//
// performance.mark('A');
// doSomeLongRunningProcess(() => {
//     performance.measure('A to Now', 'A');
//
//     performance.mark('B');
//     performance.measure('A to B', 'A', 'B');
// });

/**
perf_hooks.performance#
Объект, который можно использовать для сбора показателей производительности из текущего экземпляра Node.js.
 */

/**
performance.clearMarks([name])#
 name <строка>
Если name не указан, удаляет все PerformanceMark объекты с
временной шкалы производительности. Если name предоставляется, удаляет только указанную метку.
 */

/**
performance.eventLoopUtilization([utilization1[, utilization2]])#

   utilization1 <Object> Результат предыдущего вызова eventLoopUtilization().
   utilization2 <Object> Результат предыдущего вызова eventLoopUtilization() до utilization1.
Возвращает <объект>
   idle <число>
   active <число>
   utilization <число>
eventLoopUtilization()Метод возвращает объект , который содержит кумулятивную
  продолжительность времени, в течение цикла события был как в режиме ожидания
 */

// 'use strict';
// const { eventLoopUtilization } = require('perf_hooks').performance;
// const { spawnSync } = require('child_process');
//
// setImmediate(() => {
//     const elu = eventLoopUtilization();
//     spawnSync('sleep', ['5']);
//     console.log(eventLoopUtilization(elu).utilization);
// });

/**
performance.timerify(fn.ts[, options])#
  fn.ts <Функция>
  options <Объект>
  histogram <RecordableHistogram> Объект гистограммы, созданный с использованием,
perf_hooks.createHistogram() который будет записывать продолжительность выполнения в наносекундах.
 */

// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// function someFunction() {
//     console.log('hello world');
// }
//
// const wrapped = performance.timerify(someFunction);
//
// const obs = new PerformanceObserver((list) => {
//     console.log(list.getEntries()[0].duration);
//     obs.disconnect();
// });
// obs.observe({ entryTypes: ['function'] });
//
// // A performance timeline entry will be created
// wrapped();

/**
Класс: perf_hooks.PerformanceObserver#
    new PerformanceObserver(callback)#
    callback <Функция>

list <PerformanceObserverEntryList>
observer <Наблюдатель за производительностью>
Performance Observer объекты предоставляют уведомления, когда новые
Performance Entry экземпляры были добавлены на временную шкалу производительности.
 */

// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// const obs = new PerformanceObserver((list, observer) => {
//     console.log(list.getEntries());
//     observer.disconnect();
// });
// obs.observe({entryTypes: ['mark'], buffered: true});

// performance.mark('test');
/**
Поскольку Performance Observer экземпляры создают свои собственные дополнительные
издержки производительности, экземпляры не следует оставлять подписанными на уведомления
на неопределенный срок. Пользователи должны отключать наблюдателей, как только они больше не нужны.

    callback Вызывается , когда Performance Observer сообщается о новых PerformanceEntry случаях.
    Обратный вызов получает PerformanceObserverEntryList экземпляр и ссылку на PerformanceObserver.
 */


/**
performanceObserver.observe(options)#
options <Объект>
    type <string> Один тип <PerformanceEntry> .
       Не должно быть указано, если entryTypes уже указано.
    entryTypes <string []> Массив строк, определяющих
       типы экземпляров <PerformanceEntry>, которые интересуют
       наблюдателя. Если не указан, будет выдана ошибка.
    buffered <boolean> Если true, обратный вызов наблюдателя
       вызывается со списком глобальных PerformanceEntry буферизованных
       записей. Если false, PerformanceEntry в обратный вызов наблюдателя
       отправляются только s, созданные после указанного момента времени.
       По умолчанию: false .
    Подписывает экземпляр <PerformanceObserver> на уведомления о новых
    экземплярах <PerformanceEntry>, идентифицированных либо с помощью,
    options.entryTypes либо options.type:
 */

// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// const obs = new PerformanceObserver((list, observer) => {
//     // Called three times synchronously. `list` contains one item.
// });
// obs.observe({ type: 'mark' });
//
// for (let n = 0; n < 3; n++)
//     performance.mark(`test${n}`);


/**
performanceObserverEntryList.getEntries()

Возвращает: <PerformanceEntry []>
Возвращает список PerformanceEntry объектов в хронологическом порядке относительно performanceEntry.startTime.
 */

// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// const obs = new PerformanceObserver((perfObserverList, observer) => {
//     console.log(perfObserverList.getEntries());
//     /**
//      * [
//      *   PerformanceEntry {
//      *     name: 'test',
//      *     entryType: 'mark',
//      *     startTime: 81.465639,
//      *     duration: 0
//      *   },
//      *   PerformanceEntry {
//      *     name: 'meow',
//      *     entryType: 'mark',
//      *     startTime: 81.860064,
//      *     duration: 0
//      *   }
//      * ]
//      */
//     observer.disconnect();
// });
// obs.observe({ type: 'mark' });
//
// performance.mark('test');
// performance.mark('meow');

/**
performanceObserverEntryList.getEntriesByName(name[, type])#
 name <строка>
 type <строка>
   Возвращает: <PerformanceEntry []>
Возвращает список PerformanceEntry объектов в хронологическом порядке, для performanceEntry.startTime которых
performanceEntry.name равно name, и, необязательно, для которых performanceEntry.entryType равно type.
 */

// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// const obs = new PerformanceObserver((perfObserverList, observer) => {
//     console.log(perfObserverList.getEntriesByName('meow'));
//     /**
//      * [
//      *   PerformanceEntry {
//      *     name: 'meow',
//      *     entryType: 'mark',
//      *     startTime: 98.545991,
//      *     duration: 0
//      *   }
//      * ]
//      */
//     console.log(perfObserverList.getEntriesByName('nope')); // []
//
//     console.log(perfObserverList.getEntriesByName('test', 'mark'));
//     /**
//      * [
//      *   PerformanceEntry {
//      *     name: 'test',
//      *     entryType: 'mark',
//      *     startTime: 63.518931,
//      *     duration: 0
//      *   }
//      * ]
//      */
//     console.log(perfObserverList.getEntriesByName('test', 'measure')); // []
//     observer.disconnect();
// });
// obs.observe({ entryTypes: ['mark', 'measure'] });
//
// performance.mark('test');
// performance.mark('meow');

/**
performanceObserverEntryList.getEntriesByType(type)#
  type <строка>
Возвращает: <PerformanceEntry []>
Возвращает список PerformanceEntry объектов в хронологическом
 порядке, для performanceEntry.startTime которых performanceEntry.entryType равно type.
 */

// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// const obs = new PerformanceObserver((perfObserverList, observer) => {
//     console.log(perfObserverList.getEntriesByType('mark'));
//     /**
//      * [
//      *   PerformanceEntry {
//      *     name: 'test',
//      *     entryType: 'mark',
//      *     startTime: 55.897834,
//      *     duration: 0
//      *   },
//      *   PerformanceEntry {
//      *     name: 'meow',
//      *     entryType: 'mark',
//      *     startTime: 56.350146,
//      *     duration: 0
//      *   }
//      * ]
//      */
//     observer.disconnect();
// });
// obs.observe({ type: 'mark' });
//
// performance.mark('test');
// performance.mark('meow');

/**
perf_hooks.monitorEventLoopDelay([options])#
  options <Объект>
  resolution <число> Частота дискретизации в миллисекундах. Должно быть больше нуля. По умолчанию: 10 .
Возвращает: <IntervalHistogram>
Это свойство является расширением Node.js. Он недоступен в веб-браузерах.

Создает IntervalHistogram объект, который производит выборку и сообщает о
задержке цикла событий с течением времени. Задержки будут сообщаться в наносекундах.

Использование таймера для определения приблизительной задержки цикла событий
 работает, потому что выполнение таймеров конкретно привязано к жизненному циклу
  цикла событий libuv. То есть задержка в цикле вызовет задержку в выполнении
  таймера, и именно эти задержки предназначены для обнаружения этого API.
 */

// const { monitorEventLoopDelay } = require('perf_hooks');
// const h = monitorEventLoopDelay({ resolution: 20 });
// h.enable();
// // Do something.
// h.disable();
// console.log(h.min);
// console.log(h.max);
// console.log(h.mean);
// console.log(h.stddev);
// console.log(h.percentiles);
// console.log(h.percentile(50));
// console.log(h.percentile(99));

/**
Измерение продолжительности асинхронных операций#
В следующем примере используются API-интерфейсы
 Async Hooks и Performance для измерения фактической
  продолжительности операции тайм-аута (включая количество
   времени, которое потребовалось для выполнения обратного вызова).
 */

// 'use strict';
// const async_hooks = require('async_hooks');
// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
//
// const set = new Set();
// const hook = async_hooks.createHook({
//     init(id, type) {
//         if (type === 'Timeout') {
//             performance.mark(`Timeout-${id}-Init`);
//             set.add(id);
//         }
//     },
//     destroy(id) {
//         if (set.has(id)) {
//             set.delete(id);
//             performance.mark(`Timeout-${id}-Destroy`);
//             performance.measure(`Timeout-${id}`,
//                 `Timeout-${id}-Init`,
//                 `Timeout-${id}-Destroy`);
//         }
//     }
// });
// hook.enable();
//
// const obs = new PerformanceObserver((list, observer) => {
//     console.log(list.getEntries()[0]);
//     performance.clearMarks();
//     observer.disconnect();
// });
// obs.observe({ entryTypes: ['measure'], buffered: true });
//
// setTimeout(() => {}, 1000);

/**
Измерение времени, необходимого для загрузки зависимостей#
В следующем примере измеряется продолжительность require() операций по загрузке зависимостей:
 */

// 'use strict';
// const {
//     performance,
//     PerformanceObserver
// } = require('perf_hooks');
// const mod = require('module');
//
// // Monkey patch the require function
// mod.Module.prototype.require =
//     performance.timerify(mod.Module.prototype.require);
// require = performance.timerify(require);
//
// // Activate the observer
// const obs = new PerformanceObserver((list) => {
//     const entries = list.getEntries();
//     entries.forEach((entry) => {
//         console.log(`require('${entry[0]}')`, entry.duration);
//     });
//     obs.disconnect();
// });
// obs.observe({ entryTypes: ['function'], buffered: true });
//
// require('some-module');