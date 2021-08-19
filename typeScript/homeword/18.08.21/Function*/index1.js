function* gen(arr) {

yield 4

    yield 'The End'
}

const arr = [1, 3, 5, 6]

const generator = gen(arr);

const one = generator.next()

console.log(one);
console.log();

console.log(JSON.stringify(generator.next().value, )); // {value: 1, done: false}