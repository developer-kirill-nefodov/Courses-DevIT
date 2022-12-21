/** Test-1 **/
function recursion(N = 4) {

}

/** Test-2 **/
function table(i) {
  for (let x = 1; x < 10; x++) {
    for (let y = 1; y <= i; y++) {
      console.log(`${x} * ${y} = ${x * y}`)
    }
    console.log(" ")
  }
}

// table(4)
/** Test-3 **/

function fib(n) {
  let a = n
  for (let x = 0; x <= n; x++) {
    console.log(n)
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log(fib(7))


