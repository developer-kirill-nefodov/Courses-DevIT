class ShopGrid {
    shopGrid = {
        shop: []
    }

    getShop() {
        return this.shopGrid.shop.map(e => e)
    }
}

const shopGrid = new ShopGrid()

import {person1, person2, person3, person4} from "./src/person/person.js";
import {food1, food2, food3, drink1, drink2, drink3} from "./src/menu/menu.js";
import random_ID from "./src/random_ID/random_ID.js";

function* Purchase(menu) {
    while (true) {
        const men = {...menu}
        const upMenu = {}
        let purchase = [];

        let operation = 1;

        for (let idx in menu) {
            // noinspection JSUnfilteredForInLoop
            upMenu[idx] = menu[idx].map((e) => {
                return {name: e.name, price: e.price}
            })
        }

        do {
            let newProto, is = -1;

            console.log(menu);

            const a = yield 'Что вы хотите купить?';

            for (let idx in menu) {
                // noinspection JSUnfilteredForInLoop
                let key = men[idx].map(n => n.name).indexOf(a);

                if (key > -1) {
                    // noinspection JSUnfilteredForInLoop
                    newProto = menu[idx].filter(i => i.name === a);
                    is = key;
                }
            }

            if (is === -1) {
                console.log('Товар с таким названием не существует');
                continue;
            }

            /**
             let b = yield 'Что нибуть добавить?'; if (b === 'no') b = 1;    //В разработке
             */

            let c = yield 'Сколько?';

            if (typeof c !== "number" || c < 0) c = 1;

            purchase.push(Object.assign(...newProto, {number: c}));

            const d = yield 'Что нибудь ещё?';

            console.log(purchase);

            if (d === 'no' || d === 'No') {
                const product = {name: '', sum: 0, calories: 0};

                for (let i = 0; i < purchase.length; i++) {
                    let idx1 = purchase[i];
                    let {name, price, calories, number} = idx1;

                    product.name += `${number + name}, `;
                    product.sum += price * number;
                    product.calories += calories * number;
                }
                operation--;
                purchase = [];
                console.log(product);
            }
        } while (operation)
        yield 'Спасибо за покупку, приходите ещё'
    }
}

class FastFood {
    structure = {
        title: null,
        address: null,
        staff: [],
        menu: {
            food: [],
            drink: []
        },
        discount: []
    }

    constructor(address, title) {
        this.purchases = Purchase(this.structure.menu);
        this.structure.address = address;
        this.structure.title = title;
    }

    addStaff(data) {
        let newStaff = {};

        if (data.age < 18) {
            return 'Мы вам перезвонем!!!';
        }

        if (data.experienceWork <= 2) {
            newStaff = Object.assign({}, data, {position: 'assistant', salary: 9000, id: random_ID()});
            this.structure.staff.push(newStaff);

            return (
                `${newStaff.name} принять на должность ${newStaff.position} в заведение ${this.structure.title}`
            )
        }

        if (data.experienceWork > 2 && data.experienceWork < 5) {
            newStaff = Object.assign({}, data, {position: 'salesman', salary: 15000, id: random_ID()});
            this.structure.staff.push(newStaff);

            return (
                `${newStaff.name} принять на должность ${newStaff.position} в заведение ${this.structure.title}`
            )
        }

        if (data.experienceWork > 4) {
            newStaff = Object.assign({}, data, {position: 'cook', salary: 25000, id: random_ID()});
            this.structure.staff.push(newStaff);

            return (
                `${newStaff.name} принять на должность ${newStaff.position} в заведение ${this.structure.title}`
            )
        }
    }

    addMenu(data) {
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

    addDiscount() {
        /** В разработке */
    }

    upData(id, data) {
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
                    console.log('Error: You cannot add properties!!!');
                }
            }

        }
        return `Запрос на обновление по такому id: ${id}, не выполнен!!!`
    }

    delete(id) {
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
                return `По жалобам клиентав из ${idx}, убрали ${menuX.name}`
            }
        }
        return `Запрос на удаление по такому id: ${id}, не выполнен!!!`
    }

    purchase(data) {
        return this.purchases.next(data).value
    }

    getMenu() {
        return this.structure.menu;
    }

    getWorkers() {
        return this.structure.staff;
    }

    averageSalary() {
        const ave = this.structure.staff
        const workers = ave.reduce((c, b) => c + b.salary, 0)

        return Math.round(workers / ave.length)
    }

    registerSHOP() {
        const idx = shopGrid.shopGrid.shop.map(e => e.title).indexOf(this.structure.title)
        const data = {
            title: this.structure.title,
            address: this.structure.address,
            staff: this.structure.staff.length,
            menu: this.structure.menu,
            discount: this.structure.discount
        }

        if (idx > -1) {
            delete shopGrid.shopGrid.shop[idx];
            shopGrid.shopGrid.shop.push(data)
        } else {
            shopGrid.shopGrid.shop.push(data)
        }
    }
}

const kebab = new FastFood('Новгороськая улица, 5-7', 'Кебаб Хаус');

console.log(kebab.addStaff(person1))
console.log(kebab.addStaff(person2))
console.log(kebab.addStaff(person3))
console.log(kebab.addStaff(person4))
console.log(kebab.addMenu(food1))
console.log(kebab.addMenu(food2))
console.log(kebab.addMenu(food3))
console.log(kebab.addMenu(drink1))
console.log(kebab.addMenu(drink2))
console.log(kebab.addMenu(drink3))

kebab.registerSHOP()

console.log(shopGrid.getShop())

/** Покупка
 console.log(kebab.purchase())
 console.log(kebab.purchase('Pizza'))
 console.log(kebab.purchase(30))
 console.log(kebab.purchase('yas'))
 console.log(kebab.purchase('Water'))
 console.log(kebab.purchase(30))
 console.log(kebab.purchase('no'))
 * */
