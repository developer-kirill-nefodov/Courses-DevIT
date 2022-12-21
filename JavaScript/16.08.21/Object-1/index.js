function listAllProperties(obj) {
  return {
    ...obj,
    '[[Prototype]]': Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
  }
}

const person = {
  name: 'Bob',
  age: 20,
  hasTail: false,

  walk() {
    console.log(this.name)
  }
};

console.log(listAllProperties(person))
