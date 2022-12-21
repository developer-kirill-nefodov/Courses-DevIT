function mergeObject<T, R>(obj1: T, obj2: R): T & R {
  return Object.assign({}, obj1, obj2);
}

const obj1 = {
  name: 'Kirill',
  surname: 'Black Gold'
}

const obj2 = {
  age: 20
}

console.log(mergeObject(obj1, obj2))
