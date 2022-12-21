/** Test-1 **/
const Count = () => {
  const a = 1, b = 1;

  return s => {
    if (s === 'int') return `1: a: ${a++}, b: ${b++}`
    if (s === 'des') return `2: a: ${--a}, b: ${b++}`
    if (s === 'up') return `2: a: ${a = 0}, b: ${b++}`

    return `b: ${b}`
  }
}

const c = Count()

// console.log(c('int'))
// console.log(c('des'))
// console.log(c('up'))
// console.log(c(''))

/** Test-2 **/

function fib(n) {
  let a = 0, b = 1, sum;

  return function () {
    for (let i = 2; i <= n; i++) {
      a = (n - 1);
      b = (n - 2);
      sum = a + b
    }
    return sum
  }
}

let result = fib(7) //11

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

