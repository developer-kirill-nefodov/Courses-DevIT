/**
 * https://nodejs.org/dist/latest-v14.x/docs/api/report.html
 */

//Предоставляет сводку диагностики в формате JSON, записанную в файл.

/**
Отчет предназначен для разработки, тестирования и использования в
производственной среде с целью сбора и сохранения информации для определения проблем.
 */

/**
node --report-uncaught-exception --report-on-signal \
--report-on-fatal error app.js
*/

/**
--report-uncaught-exception Позволяет формировать отчет о невыявленных исключениях.
 Полезно при проверке стека JavaScript в сочетании с собственным стеком и другими данными среды выполнения.

--report-on-signal Позволяет создавать отчет при получении указанного
(или предопределенного) сигнала для запущенного процесса Node.js.

--report-on-fatal error Позволяет запускать отчет при фатальных ошибках (внутренние ошибки в среде выполнения
 Node.js, например, нехватка памяти), которые приводят к завершению работы приложения.

 --report-compact Создавайте отчеты в компактном однострочном формате JSON

 --report-directory Место, в котором будет создан отчет.

--report-filename Имя файла, в который будет записан отчет.

--report-signal Устанавливает или сбрасывает сигнал для создания отчета
 */

//Создание отчетов на основе сигналов не поддерживается в Windows.

//Отчет также может быть запущен с помощью вызова API из приложения JavaScript:
// process.report.writeReport();
// process.report.writeReport('./foo.json');


// try {
//     process.chdir('/non-existent-path');
// } catch (err) {
//     process.report.writeReport(err);
//     // Если и имя файла, и объект ошибки передаются writeReport() объекту ошибки, должен быть вторым параметром.
// }

// const report = process.report.getReport();
// console.log(typeof report === 'object'); // true

// Similar to process.report.writeReport() output
// console.log(JSON.stringify(report, null, 5));

/**
  $node
> process.report.writeReport();
 */

// Отчет о триггере только для неперехваченных исключений.
process.report.reportOnFatalError = false;
process.report.reportOnSignal = false;
process.report.reportOnUncaughtException = true;

// Отчет о запуске как для внутренних ошибок, так и для внешнего сигнала.
process.report.reportOnFatalError = true;
process.report.reportOnSignal = true;
process.report.reportOnUncaughtException = false;

// Измените сигнал по умолчанию на «SIGQUIT» и включите его.
process.report.reportOnFatalError = false;
process.report.reportOnUncaughtException = false;
process.report.reportOnSignal = true;
process.report.signal = 'SIGQUIT';

NODE_OPTIONS="--report-uncaught-exception \
  --report-on-fatalerror --report-on-signal \
  --report-signal=SIGUSR2  --report-filename=./report.json \
  --report-directory=/home/nodeuser"