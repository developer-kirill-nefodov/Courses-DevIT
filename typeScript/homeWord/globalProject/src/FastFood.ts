import {random_ID} from "./function.js";
import Order from "./Order.js";

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
        public title: string) {
    }

    addStaff(data): string {
        let newStaff: object = {
            name: null,
            position: null
        };

        if (18 > data.age) {
            return 'Мы вам перезвоним!!!';
        }

        if (data.experienceWork <= 2) {
            // @ts-ignore
            newStaff = Object.assign({}, data, {position: 'assistant', salary: 9000, id: random_ID()});
            this.structure.staff.push(newStaff);

            return (
                // @ts-ignore
                `${newStaff.name} принять на должность ${newStaff.position} в заведение ${this.structure.title}`
            )
        }

        if (data.experienceWork > 2 && data.experienceWork < 5) {
            // @ts-ignore
            newStaff = Object.assign({}, data, {position: 'salesman', salary: 15000, id: random_ID()});
            this.structure.staff.push(newStaff);

            return (
                // @ts-ignore
                `${newStaff.name} принять на должность ${newStaff.position} в заведение ${this.structure.title}`
            )
        }

        if (data.experienceWork > 4) {
            newStaff = Object.assign({}, data, {position: 'cook', salary: 25000, id: random_ID()});
            this.structure.staff.push(newStaff);

            return (
                // @ts-ignore
                `${newStaff.name} принять на должность ${newStaff.position} в заведение ${this.structure.title}`
            )
        }
    }

    addMenu(data): string {
        let newMenu = {};
        if (this.structure.menu.food.length > 0) {
            if (this.structure.menu.food.filter(key => key.name === data.name).length) return `Есть в меню`
        }

        if (this.structure.menu.drink.length > 0) {
            if (this.structure.menu.food.filter(key => key.name === data.name).length) return `Есть в меню`
        }

        if (data.type === 'food') {
            newMenu = Object.assign({}, data, {id: random_ID()});
            this.structure.menu.food.push({...newMenu});
            return `${data.name} добавлен`
        }

        if (data.type === 'drink') {
            newMenu = Object.assign({}, data, {id: random_ID()});
            this.structure.menu.drink.push({...newMenu});
            return `${data.name} добавлен`
        }
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