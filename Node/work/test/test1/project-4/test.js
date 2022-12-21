let arr = '0.0.0.0:6003 -',
  arrPort = []

let start = arr.indexOf(':');
let finish = arr.indexOf('-');

arrPort.push(arr.slice(start + 1, finish - 1))
console.log(arrPort)
