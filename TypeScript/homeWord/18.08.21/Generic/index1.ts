function getLength<T>(arr: T[]): number {
  return arr.length
}

const arrString = ['Aa', 'Bb', 'Cc']
const arrNumber = [1, 2, 3]

console.log(getLength(arrString))
console.log(getLength(arrNumber))
