import {Person, TypeFood} from "./Class.js";


import {random_ID} from "./function.js";
import Order from "./Order.js";


type person = { name: string, surname: string, age: number, experienceWork: number }
type additive = { type: 'food' | 'drink', name: string, price: number, calories: number, typeFood: [{name:string}] }
type menu = { type: 'food' | 'drink', name: string, price: number, calories: number}


class FastFood {
    private structure = {
        title: this.title,
        address: this.address,
        staff: [],
        menu: {
            food: [],
            drink: []
        },
        orders: null,
        discount: []
    }

    constructor(
        public address: string,
        public title: string) {}

    addStaff(data: person): string {
        if (18 > data.age) return 'Мы вам перезвоним!!!';

        if (data.experienceWork <= 2) {
            const newPerson = new Person(data.name, data.surname, data.age, data.experienceWork , 'assistant', 9000, random_ID())
            this.structure.staff.push(newPerson);

            return (
                `${newPerson.name} принять на должность ${newPerson.position} в заведение ${this.structure.title}`
            )
        }

        if (data.experienceWork > 2 && data.experienceWork < 5) {
            const newPerson = new Person(data.name, data.surname, data.age, data.experienceWork , 'salesman', 15000, random_ID())
            this.structure.staff.push(newPerson);

            return (
                `${newPerson.name} принять на должность ${newPerson.position} в заведение ${this.structure.title}`
            )
        }

        if (data.experienceWork > 4) {
            const newPerson = new Person(data.name, data.surname, data.age, data.experienceWork , 'cook', 25000, random_ID())
            this.structure.staff.push(newPerson);

            return (
                `${newPerson.name} принять на должность ${newPerson.position} в заведение ${this.structure.title}`
            )
        }
    }

    addMenu(data: menu): string {
        if (this.structure.menu.food.length > 0) {
            if (this.structure.menu.food.filter(key => key.name === data.name).length) return `Есть в меню`
        }

        if (this.structure.menu.drink.length > 0) {
            if (this.structure.menu.drink.filter(key => key.name === data.name).length) return `Есть в меню`
        }

        if (data.type === 'food') {
            const newFood = new TypeFood(data.type, data.name, data.price, data.calories, random_ID())
            this.structure.menu.food.push(newFood);
            return `${newFood.name} добавлен`
        }

        if (data.type === 'drink') {
            const newDrink= new TypeFood(data.type, data.name, data.price, data.calories, random_ID())
            this.structure.menu.drink.push(newDrink);
            return `${newDrink.name} добавлен`
        }
    }

    addAdditive(data: additive): string {

        return ``
    }

    upData(id: string, data): string {
        let key = this.structure.staff.map(p => p.id).indexOf(id);

        if (key !== -1) {
            try {
                Object.assign(Object.preventExtensions(this.structure.staff[key]), data);
                return 'В staff произошло обновление'
            } catch (e) {
                return 'Error: You cannot add properties!!!'
            }
        }

        for (let idx in this.structure.menu) {
            key = this.structure.menu[idx].map(p => p.id).indexOf(id);
            if (key !== -1) {
                try {
                    Object.assign(Object.preventExtensions(this.structure.menu[idx][key]), data);
                    return `В меню ${key} произошло обновление`
                } catch (e) {
                    return 'Error: You cannot add properties!!!';
                }
            }
        }
        return `Запрос на обновление по такому id: ${id}, не выполнен!!!`
    }

    delete(id: string): string {
        let key = this.structure.staff.map(p => p.id).indexOf(id);

        if (key !== -1) {
            let personX = this.structure.staff[key];
            delete this.structure.staff[key];
            return `${personX.name} уволили из ${this.structure.title}`
        }

        for (let idx in this.structure.menu) {
            key = this.structure.menu[idx].map(p => p.id).indexOf(id);
            if (key !== -1) {
                let menuX = this.structure.menu[idx][key];
                delete this.structure.menu[idx][key];
                return `По жалобам клиентов из ${idx}, убрали ${menuX.name}`
            }
        }
        return `Запрос на удаление по такому id: ${id}, не выполнен!!!`
    }

    purchase(type, name, number = 1, additive = 'null', close = 'null') {
        let num = number < 0 ? 1 : number

        if (!this.structure.orders) {
            const data = new Date();
            this.structure.orders = new Order(0, 'open', data)
        }

        if (type === 'drink' || type === 'food') {
            for (let key of this.structure.menu[type]) {
                if (key.name === name) {

                    const newObj = {
                        type: type,
                        name: key.name,
                        number: number,
                        price: key.price,
                        calories: key.calories,
                        additive: [{name: additive}]
                    }
                    newObj.calories *= num;
                    newObj.price *= num;

                    if (additive !== 'null') {
                        for (let idx of key.additive) {
                            if (idx.name === additive) {
                                newObj.additive.push(idx.name)
                                newObj.price += idx.price;
                                newObj.calories += idx.calories;
                            }
                        }
                    }

                    if (close === 'close') {
                        return this.structure.orders.closeOrd();
                    }
                    return this.structure.orders.addOrd(newObj);
                }
            }
        } else return 'no type'

    }

    getMenu() {
        return this.structure.menu;
    }

    getWorkers() {
        return this.structure.staff;
    }

    averageSalary(): number {
        const ave = this.structure.staff
        const workers = ave.reduce((c, b) => c + b.salary, 0)

        return Math.round(workers / ave.length)
    }
}

export default FastFood;