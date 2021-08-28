/** test-1 */
const path = require('path')

function getPath() {
    return path.resolve(__dirname, __filename)
}

console.log(getPath())

/** test-2 */

function f(path1, path2 = null) {
    if (path2 === null) {
        return path.resolve(path1)
    }

}