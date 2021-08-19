function* gen(arr) {

   setTimeout(()=> {

    }, 1000)

    yield 'The End'
}

const arr = [1, 3, 5, 6]

const generator = gen(arr);


console.log(generator.next());


console.log(JSON.stringify(generator.next().value, )); // {value: 1, done: false}