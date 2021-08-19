/** Первый способ написать класс в син. ts нужно в самом классе задать все значения
 * В нашем классе будут три свойства посе этого мы можем добавить конструктор **/
class User {
    public name: string;
    private age: number;
    protected nickName: string;
    readonly password: string;

    constructor(name: string, age: number, nickName: string, password: string) {
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
    age: number = 20;
    name: string;
    nickName: string;

    constructor(name: string, nickName: string) {
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
    constructor(
        public name: string,
        public age: number,
        public nickName: string,
        public password: string
    ){}
}

const user2 = new User2('Kirill', 20, 'boss', '1234')
console.log(user2)
/** Get and Set **/

class User3 {
    private age: number = 20;

    constructor(public name: string) {
        this.name = name;
    }

   setAge(age: number): void {
        this.age = age
    }

    set myAge(age: number) {
        this.age = age
    }
}

/** abstract class **/

abstract class User4 {
    abstract user: string = 's';

    abstract mode(adc: number):void

}
