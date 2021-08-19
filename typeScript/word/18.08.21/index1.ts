class Car1 {
    private age: number = 20;

    getAge(): number {
        return this.age
    }
}

class Car2 {
    private age: number = 40;

    getAge(age: number): void {
        this.age = age
    }
}

const car1 = new Car1()
const car2 = new Car2()

car2.getAge(car1.getAge())
console.log(car1.getAge())



