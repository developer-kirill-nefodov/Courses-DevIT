function fib(n) {
  let a = 1, b = 1, sum;

  for (let i = 3; i <= n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return b;
}

function* generatorFib() {
  let n = 1;

  while (true) {
    yield fib(n);
    n++
  }
}

const gen = generatorFib()

console.log(gen.next())
