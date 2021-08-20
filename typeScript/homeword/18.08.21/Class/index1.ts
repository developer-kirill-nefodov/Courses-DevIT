class Demo {
    private age: number = 20;

    getAge(): number {
        return this.age
    }
}

class Demo1 {
    private age: number = 40;

    upAge(age: number): void {
        this.age = age
    }

    getAge(): number{
        return this.age
    }
}

const demo = new Demo()
const demo1 = new Demo1()

demo1.upAge(demo.getAge())
console.log(demo1.getAge())