export class Person {
    constructor(
        public name: string,
        public surname: string,
        public age: number,
        public experienceWork: number,
        public position: string,
        public salary: number,
        public id: string) {
    }
}

export class TypeFood {
    type: 'food' | 'drink';
    name: string;
    price: number;
    calories: number;
    id: string;

    constructor(type, name, price, calories, id: string) {
        this.type = type;
        this.name = name;
        this.price = price;
        this.calories = calories;
        this.id = id
    }
}