/** test-1 */
const a = Buffer.from('bla-bla-bla')

function buff1(buff, from, to) {
  const oldBuff = buff.slice(from, to)

  const bufferCopy = Buffer.alloc(oldBuff.length);
  oldBuff.copy(bufferCopy);

  return bufferCopy;
}


console.log(buff1(a, 1, 3))

/** test-2 */

const b = Buffer.from([1, 2, 3, 4, 5, 67])
const c = Buffer.from([22, 33, 4455, 6, 778])
const d = Buffer.from([22, 33, 4455, 6, 778])


const newBuff = Buffer.concat([
  b, c, d
]);

const newB = new Set(newBuff);
const newC = Buffer.from([...newB])

console.log(newC.toJSON().data)
