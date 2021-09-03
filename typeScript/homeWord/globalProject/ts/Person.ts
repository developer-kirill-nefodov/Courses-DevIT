class Person {
    constructor(
        public name: string,
        public surname: string,
        public age: number,
        public experienceWork: number) {}
}

const person1 = new Person('Kirill', 'Nefodov', 18, 3)
const person2 = new Person('Maxim', 'xxx', 18, 1)
const person3 = new Person('Andrey', 'xxx', 22, 5)
const person4 = new Person('Sasha', 'xxx', 21, 4)

export {
    person1,
    person2,
    person3,
    person4
}