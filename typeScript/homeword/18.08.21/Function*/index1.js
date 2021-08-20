// function* a(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         yield arr[i]
//     }
// }
//
//
// function arrGenWithDelay(generator, arr) {
//
//     const gen = generator(arr);
//
//     const p = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve()
//             }, 1000)
//         }
//     ).then(() => {
//         console.log(gen.next())
//     }).catch(e => {
//         console.log(e)
//     })
//
//     for (let a = 0; a < arr.length; a++) {
//         p.finally()
//     }
//
//     const setIn = setInterval(() => gen.next(), 1000)
//
//
//     return `The End ${gen.next().done}`
// }
//
// console.log(arrGenWithDelay(a, [1, 2, 3])); // The End true




function test1() {
    console.time('1');
    setTimeout(()=> {
        console.timeEnd('1')
        console.log(0);
    }, 0)
}


function test2() {
    console.time('1')
    setImmediate(()=> {
        console.timeEnd()
        console.log(1)
    }, 0)
}

test1()
test2()
console.log(2)
