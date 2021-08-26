/** test-1 */

function printNumbers(from, to) {
    const a = setInterval(() => {
        console.log(from);
        if(from < to) from++;
        else clearInterval(a);
    }, 1000)
}

printNumbers(0, 3);

/** test-2 */
// function printNumbers(from, to) {
//     let ab = from
//     let a = setTimeout(function b() {
//         console.log(ab);
//         if(ab < to) {
//             ab++;
//             a = setTimeout(b, 1000);
//         }
//     }, 1000)
// }
//
// printNumbers(0, 3);