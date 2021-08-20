// function A () {
//     let type = null;
//     let x = null;
//     Object.defineProperty(this, 'x', {
//         get: function () {
//             return x;
//         },
//         set: function (value) {
//             if (type === null) type = typeof value;
//             if (typeof value === type) {
//                 x = value;
//             }
//         },
//         enumerable: true
//     })
// }

/**
function Single(){
    let ins = null;
    return (function (){
        if(!ins){
            ins = this
        }
        return ins
    })();
}

const a = new Single();
const b = new Single();

a.x = 10;
console.log(b.x)
console.log(a.x)
*/

/**
function a() {
    const cnt = {
        ctxB: { name: 'b'},
        ctxC: { name: 'c'}
    }
    console.log(cnt)
    return function (){
        console.log({name: 'b', ctx: this})
        return function (){
            console.log({name: 'c', ctx: this})
        }.bind(this)
    }.bind(cnt)
}
a()()();
*/


// function a(sep, ...other) {
//     const next = (other) => {
//         return x => {
//             if (!x) {
//                 return other.reduce((acc, a) => {
//                     return sep.call(sep, acc, a)
//                 }, 0);
//             }
//             return next(other, x);
//         };
//     };
//     return next();
//     // return ``
// }


/**
function a (sep, ...other){
    const c = (...arg) => {
        other.push(...arg)
        if(!arg.length){
            return other.join(sep);
        }
        return c
    }
    return c;
}

console.log(a("+")("a", "b", "c")())
console.log(a("+", "0")("1")("2")("3")("4","5")())
let carryMin = {}
*/

/**
function a (fn){
    if(typeof fn !== "function"){
        throw new Error('Not a function')
    }
    const requiredArgLength = fn.length;
    const tmpArg = [];
    const c = (...arg) => {
        if(!arg.length && requiredArgLength > arg.length){
            throw new Error('Invalid....')
        }
        tmpArg.push(...arg);
        if(tmpArg.length === requiredArgLength){
            return fn(...tmpArg);
        }
        return c;
    }
    return c;
}

 let carr = a(123)

 console.log(carr(Math.min))
*/

function A() {

}

let matrix = A()

matrix.find(1) //[0, 0]
matrix.get([0, 0]) //1
// matrix.zip()//[[0,0,1],[...]]