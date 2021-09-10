/*
https://nodejs.org/api/perf_hooks.html
https://runebook.dev/ru/docs/node/perf_hooks
https://blog.logrocket.com/experimental-node-js-testing-the-new-performance-hooks-31fcdd2a747e/
 */

// Diagnostic report - записывает в файл диагностический отчет о текущем состоянии приложения.

/*
Этот модуль обеспечивает реализацию подмножества API-интерфейсов W3C Web Performance, а также дополнительных
API-интерфейсов для измерения производительности, специфичной для Node.js.
 */

const {PerformanceObserver, performance} = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
    console.log(items.getEntries()[0].duration);

    performance.clearMarks();
});
// obs.observe({type: 'measure'});
// performance.measure('Start to Now');
//
// performance.mark('A');
// performance.measure('A to Now', 'A');
//
// performance.mark('B');
// performance.measure('A to B', 'A', 'B');
