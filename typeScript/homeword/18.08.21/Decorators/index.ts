// Объявляем декоратор, который будет помечать класс как deprecated
function deprecated<T extends {new (...args: any[]): {}}>(targetConstructor: T) {
    console.log([arguments])
    console.log(targetConstructor)

    return class extends targetConstructor {
        constructor(...args) {
            // Просто пишем в консоль, что инстанцируется deprecated класс
            console.warn(`Instantiate deprecated class: ${targetConstructor.name}`);
            super(...args);
        }
    }
}

@deprecated
class User {
    public firstname;
    public surname;

    constructor(firstname, surname) {
        this.firstname = firstname;
        this.surname = surname;
    }
}

const user = new User('John', 'Doue');
// Instantiate deprecated class: User
