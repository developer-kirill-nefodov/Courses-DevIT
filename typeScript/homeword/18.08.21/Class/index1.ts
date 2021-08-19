class Many {
    private age: number = 20;

    getAge(): number {
        return this.age
    }
}

class Many1 {
    private age: number = 40;

    getAge(age: number): void {
        this.age = age
    }
}

const car1 = new Many()
const car2 = new Many1()

car2.getAge(car1.getAge())
console.log(car1.getAge())



