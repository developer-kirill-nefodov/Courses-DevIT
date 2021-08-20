function getValue<T extends object, R extends keyof T>(obj: T, key: R) {
    return obj[key]
}

const person = {
    name: 'TestName',
    age: 22,
    job: 'developer'
}

console.log(getValue(person, 'name'))
console.log(getValue(person, 'age'))
// console.log(getValue(person, 'aaa'))
