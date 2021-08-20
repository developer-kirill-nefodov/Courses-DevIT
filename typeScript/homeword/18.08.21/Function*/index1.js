
function* gen() {
let bool = true
    while (bool){
      let a = yield arr[0] + 3


        yield 'The End'
        if(1) {
            bool = false
        }
    }

}

function wait(ms) {
    return setTimeout(() => {
        console.log('End')
       return generator.next()
    }, ms)

}


const arr = [1, 3, 5, 6]

const generator = gen();

console.log(generator.next())
console.log(generator.next().value)
console.log(generator.next())
console.log(generator.next())
// console.log(JSON.stringify(generator.next() )); // {value: 1, done: false}