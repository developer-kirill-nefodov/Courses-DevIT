/** test-1 */
const fs = require('fs');


function fn() {
 fs.readdir('./test', (err, data)=> {
     console.log(data)
 })
}

fn()
/** test-2 */