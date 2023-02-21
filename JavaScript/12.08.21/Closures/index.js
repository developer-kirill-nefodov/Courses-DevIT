/** Test-1 **/
const Count = () => {
  let a = 1, b = 1;

  return s => {
    switch (s) {
      case 'int':
        return `1: a: ${a++}, b: ${b++}`;
      case 'des':
        return `2: a: ${--a}, b: ${b++}`;
      case 'up':
        return `2: a: ${a = 0}, b: ${b++}`;
      default:
        return `b: ${b}`
    }
  }
}

const c = Count()

// console.log(c('int'))
// console.log(c('des'))
// console.log(c('up'))
// console.log(c(''))

/** Test-2 **/

function fib(n) {
  let fib = Math.floor(n) > 3 ? n : 4;

  return function () {
    fib = (fib - 1) + (fib - 2);
    return fib;
  }
}

let result = fib(3.1) //11

// console.log(result())

/** Test-3 **/

function randomNum() {
  const arr = []

  while (arr.length < 100) {
    const random = Math.floor(Math.random() * 100 + 1);

    if (arr.indexOf(random) > -1) {
      continue;
    }
    arr[arr.length] = random;
  }

  return arr.sort((a, b) => a - b)
}

// console.log(randomNum())

