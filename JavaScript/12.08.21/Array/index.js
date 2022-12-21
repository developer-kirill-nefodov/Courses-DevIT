/** Test-1 **/
const arr = [1, 1, 2, 3, 5, 8, 13, true]

function unpackingArr(arr) {
  return (
    arr.flat(Infinity).filter(data => typeof data === "number")
      .reduce((e, n) => e + n, 0))
}

console.log(unpackingArr(arr))

/** Test-2 **/
const arr1 = [2, 4, 5, 32, 6, 1, 0, 7]

function evenArr(arr) {
  return arr.filter(x => x % 2 === 0).sort((a, b) => a - b)
}

// console.log(evenArr(arr1))

/** Test-3 **/
const arr2 = [
  [1, 2, 3, 4], [5, 6, 7, 8],
  [9, 10, 11, 12], [13, 14, 15, 16],
]

function deployedArr(arr) {
  return [...arr].map(data => data.reverse()).reverse()
}

// console.log(deployedArr(arr2))
