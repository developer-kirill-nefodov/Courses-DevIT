/** Test-1 **/
function randomNum(max, num) {
  return Math.round(Math.random() * max).toString(num);
}

//console.log(randomNum(33, 8));

/** Test-2 **/
function converterNum(num) {
  return Math.sign(num) === -1 ? Math.abs(num) : -Math.abs(num)
}

// console.log(converterNum(2))  //-2
// console.log(converterNum(-2)) //2

/** Test-3 **/
function factorialNum(x, y) {
  let a = Math.ceil(Math.sqrt(((x - y) ** 2) + (y - x) ** 2))

  function b(n) {
    return (n !== 1) ? n * b(n - 1) : 1;
  }

  return b(a)
}

console.log(factorialNum(1, 4)) //120
