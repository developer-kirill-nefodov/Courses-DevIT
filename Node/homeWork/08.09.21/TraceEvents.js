/*      Trace events
https://nodejs.org/api/tracing.html#tracing_the_trace_events_module
https://runebook.dev/ru/docs/node/tracing
 */


/*<------Stability: 1 - Experimental------->*/

/**
 Трассировка – по сути это тестирование, при котором пользователь может увидеть, по какому пути
 проходит пакет данных до конечного сервера. То есть через какие узлы он проходит и с какой задержкой. ИТД
 */

/**
 Модуль trace_events предоставляет механизм для централизации информации
 трассировки, генерируемой V8, ядром Node.js и кодом пользовательского пространства.

 Трассировку можно включить с помощью --trace-event-categories командной строки
 --trace-event-Categories или с помощью модуля
 trace_events.--trace-event-categories флаг принимает список имен категорий , разделенных запятыми.
 */

/**
 Доступные категории:

 Node : пустой заполнитель.
 Node.async_hooks : включает сбор подробных async_hooks трассировки
 Node.bootstrap : позволяет фиксировать этапы начальной загрузки Node.js.
 Node.console : включает захват вывода console.time() и console.count() .
 Node.dns.native : включает сбор данных трассировки для DNS-запросов.
 Node.environment : позволяет фиксировать вехи среды Node.js.
 Node.fs.sync : включает сбор данных трассировки для методов синхронизации файловой системы.
 Node.perf : позволяет собирать измерения Performance API .
 Node.perf.usertiming : включает сбор только показателей и меток пользовательского времени Performance API.
 Node.perf.timerify : включает сбор только измерений timerify Performance API.
 Node.promises.rejections : включает сбор данных трассировки, отслеживающих количество
 необработанных отклонений обещаний и обработанных после отклонений.

 Node.vm.script : включает сбор данных трассировки для runInNewContext() , runInContext() и runInThisContext() модуля vm .
 v8 : События V8 связаны с сборкой мусора, компиляцией и выполнением.
 */


/** Node --trace-event-categories v8,Node,Node.async_hooks server.js */

// const trace_events = require('trace_events');
// const tracing = trace_events.createTracing({ categories: ['Node.perf'] });
// tracing.enable();  // Enable trace event capture for the 'Node.perf' category
//
// // do work
//
// tracing.disable();  // Disable trace event capture for the 'Node.pe

/**
 Запуск Node.js с включенной трассировкой приведет к созданию файлов журнала,
 которые можно открыть на chrome://tracing вкладке Chrome.

 По умолчанию вызывается файл журнала node_trace.${rotation}.log,
 где ${rotation}- увеличивающийся идентификатор ротации журнала.
 Можно указать --trace-event-file-pattern шаблон пути к файлу,
 который принимает строку шаблона, которая поддерживает ${rotation}и ${pid}:

 Node --trace-event-categories v8 --trace-event-file-pattern '${pid}-${rotation}.log' server.js

 Будут отключены только категории событий трассировки, не охваченные другими
 включенными Tracing объектами и не указанные --trace-event-categories флагом.
 */

// const trace_events = require('trace_events');
// const t1 = trace_events.createTracing({categories: ['Node', 'v8']});
// const t2 = trace_events.createTracing({categories: ['Node.perf', 'Node']});
// t1.enable();
// t2.enable();
//
// // Prints 'Node,Node.perf,v8'
// console.log(trace_events.getEnabledCategories());
//
// t2.disable(); // Will only disable emission of the 'Node.perf' category
//
// // Prints 'Node,v8'
// console.log(trace_events.getEnabledCategories());

/**
 trace_events.createTracing(options)#
 options <Объект>
 categories <string []> Массив имён категорий трассировки. Значения, включенные
 в массив, по возможности приводятся к строке. Если значение не может быть изменено, будет выдана ошибка.
 Возвращает: <Отслеживание

 Создает и возвращает Tracing объект для данного набора categories.
 */

// const trace_events = require('trace_events');
// const categories = ['Node.perf', 'Node.async_hooks'];
// const tracing = trace_events.createTracing({categories});
// tracing.enable();
// // do stuff
// tracing.disable();


// const trace_events = require('trace_events');
// const t1 = trace_events.createTracing({ categories: ['Node.async_hooks'] });
// const t2 = trace_events.createTracing({ categories: ['Node.perf'] });
// const t3 = trace_events.createTracing({ categories: ['v8'] });
//
// t1.enable();
// t2.enable();
//
// console.log(trace_events.getEnabledCategories());
