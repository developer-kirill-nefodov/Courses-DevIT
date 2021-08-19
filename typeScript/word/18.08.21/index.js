/** Первый способ написать класс в син. ts нужно в самом классе задать все значения
 * В нашем классе будут три свойства посе этого мы можем добавить конструктор **/
class User {
    constructor(name, age, nickName, password) {
        this.name = name;
        this.age = age;
        this.nickName = nickName;
        this.password = password;
    }
}
/**
 * Ts добавил к классам приватные и публичные данные
 * Всего есть четири модификатора доступа это:
 *
 * public - это значение по умолчанию его можно не указывать ставиться
 * перед свойством или методом автоматически; Говорит что к данному методу
 * или свойству можно получить  свободный доступ
 *
 * private - елемент класса с данным модификатором не может быть доступным за
 * пределами класса... не клаасы наследники итд.
 *
 * protected - доступ к елементу с данным модификатором могут получить только наследники
 *
 * readonly - элемент помечений им доступен только для чтения
 **/
/** В классе можно указывать значение по умолчанию default **/
class User1 {
    constructor(name, nickName) {
        this.age = 20;
        this.name = name;
        this.nickName = nickName;
    }
}
/**
 * Второй способ написание классов
 * все типы определяються в констукторе в таком ситаксисе
 * для каждого свойста указывать модификатор обезательно
 **/
class User2 {
    constructor(name, age, nickName, password) {
        this.name = name;
        this.age = age;
        this.nickName = nickName;
        this.password = password;
    }
}
const user2 = new User2('Kirill', 20, 'boss', '1234');
console.log(user2);
/** Get and Set **/
class User3 {
    constructor(name) {
        this.name = name;
        this.age = 20;
        this.name = name;
    }
    setAge(age) {
        this.age = age;
    }
    set myAge(age) {
        this.age = age;
    }
}
/** abstract class **/ 
class Car1 {
    constructor() {
        this.age = 20;
    }
    getAge() {
        return this.age;
    }
}
class Car2 {
    constructor() {
        this.age = 40;
    }
    getAge(age) {
        this.age = age;
    }
}
const car1 = new Car1();
const car2 = new Car2();
car2.getAge(car1.getAge());
console.log(car1.getAge());
