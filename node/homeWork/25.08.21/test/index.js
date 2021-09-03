let a = 10 + 12;
let b = a**2 + 10;

console.log(b);
console.log(a);

let car;
const func1 = function () {
    func2();
}
const func2 = function () {
    func4();
}
const func3 = function () {
}
const func4 = function () {
    car = new Car();
    car.funcX();
}
const Car = function () {
    this.brand = `volvo`;
    this.color = `red`;
    this.funcX = function () {
        this.funcY();
    }
    this.funcY = function () {
        this.funcZ();
    }
    this.funcZ = function () {
        console.trace(`trace car1`)
    }
}
func1();
