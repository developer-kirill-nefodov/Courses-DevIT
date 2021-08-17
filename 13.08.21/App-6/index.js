let iCh = 0, iSu = 0;

class Company {
    constructor() {
        this.company = {}
        this.boss = {};
        this.chiefs = {};
        this.subordinates = {};
    }

    create(data) {
        if (data.position === 'boss') {
            this.boss = {
                ...data,
                subordinates: this.chiefs
            }
            console.log(`${data.name}, ${data.position}`)
        }

        if (data.position === 'chief') {
            this.chiefs = {
                ...this.chiefs,
                ["idx" + iCh]: {
                    ...data,
                    chief: this.boss,
                    subordinates: this.subordinates
                }
            }
            console.log(`${data.name}, ${data.position}`);
            iCh++;
        }

        if (data.position === 'subordinate') {
            this.subordinates = {
                ...this.subordinates,
                ["idx" + iSu]: {
                    ...data,
                    chief: this.chiefs,
                }
            }
            console.log(`${data.name}, ${data.position}`)
            iSu++
        }
    }

    update(id, data) {

        for (let key in this.boss) {
            if (this.boss[key] === id) {
                this.boss = Object.assign(this.boss, data, {subordinates: {}});
                return;
            }
        }


        for (let key in this.chiefs) {
            if (this.chiefs[key].id === id) {
                this.chiefs[key] = Object.assign(this.chiefs[key], data);
                return;
            }
        }

        for (let key in this.subordinates) {
            if (this.subordinates[key].id === id) {
                this.subordinates[key] = Object.assign(this.subordinates[key], data);
                return;
            }
        }

        this.onChange()
    }

    delete(id) {

        if (this.boss.id === id) {
            this.boss = {place: 'unoccupied'};
            return
        }

        for (let key in this.chiefs) {
            if (this.chiefs[key].id === id) {
                delete this.chiefs[key];
                return;
            }
        }

        for (let key in this.subordinates) {
            if (this.chiefs[key].id === id) {
                delete this.subordinates[key];
                return;
            }
        }

        this.onChange()
    }


    onChange() {
        let a = {...this.boss},
            b = {...this.chiefs},
            c = {...this.subordinates};

        if (a.name === undefined) {
            for (let key in b) {
                a = Object.assign(b[key], {position: 'boss'});
                console.log(a)
                delete b[key];
                if (a.name !== undefined) break;
            }

        }


        for (let key in b) {
            b[key] = Object.assign(b[key], {chiefs: {}, subordinates: {}})
        }

        for (let key in c) {
            c[key] = Object.assign(c[key], {chiefs: {}, subordinates: null})
        }

        this.company = {
            boss: {a},
            chiefs: {b},
            subordinates: {c}
        }

    }

    getChief(method, value) {
        for (let key in this.chiefs) {
            if (this.chiefs[key][method] === value) {
                return this.chiefs[key]
            }
        }

        return 'person not found'
    }

    getChiefAll() {
        return this.chiefs
    }


    getSubordinated(method, value) {
        for (let key in this.subordinates) {
            if (this.subordinates[key][method] === value) {
                return this.subordinates[key]
            }
        }
        return 'person not found'
    }

    getSubordinatedAll() {
        return this.subordinates
    }


    getAverageSalary() {
        let money = 0, am = 0;

        money += this.boss.bid
        am++

        for (let key in this.chiefs) {
            money += this.chiefs[key].bid;
            am++;
        }

        for (let key in this.subordinates) {
            money += this.subordinates[key].bid;
            am++;
        }

        return money / am
    }

    toJSON() {
        return JSON.stringify(this.company);
    }

}


class Person {
    constructor(options) {
        this.name = options.name;
        this.surname = options.surname;
        this.age = options.age;
        this.telephone = options.telephone;
        this.email = options.email;
        this.bid = options.bid;
        this.position = options.position;
        this.id = options.id
    }

}


const company = new Company()

const bigBoss = new Person({
    name: 'Kirill',
    surname: 'Nefodov',
    age: 20,
    telephone: '+380963703264',
    email: 'kirill@gmail.com',
    bid: 9e9,
    position: 'boss',
    id: 1
})

const chiefs1 = new Person({
    name: 'Bob',
    surname: 'Xxx',
    age: 25,
    telephone: '+380963703263',
    email: 'Bob@gmail.com',
    bid: 90000,
    position: 'chief',
    id: 2
})
const chiefs2 = new Person({
    name: 'Vlad',
    surname: 'Xxx',
    age: 25,
    telephone: '+380963703263',
    email: 'Bob@gmail.com',
    bid: 90000,
    position: 'chief',
    id: 3
})
const chiefs3 = new Person({
    name: 'personX',
    surname: 'Xxx',
    age: 25,
    telephone: '+380963703263',
    email: 'Bob@gmail.com',
    bid: 90000,
    position: 'chief',
    id: 4
})

const subordinates1 = new Person({
    name: 'Maxim1',
    surname: 'Xxx',
    age: 90,
    telephone: '+380963703262',
    email: 'maxim@gmail.com',
    bid: 20000,
    position: 'subordinate',
    id: 5
})

const subordinates2 = new Person({
    name: 'Maxim2',
    surname: 'Xxx',
    age: 90,
    telephone: '+380963703262',
    email: 'maxim@gmail.com',
    bid: 20000,
    position: 'subordinate',
    id: 6
})

const subordinates3 = new Person({
    name: 'Maxim3',
    surname: 'Xxx',
    age: 90,
    telephone: '+380963703262',
    email: 'maxim@gmail.com',
    bid: 20000,
    position: 'subordinate',
    id: 7
})

company.create(bigBoss)
company.create(chiefs1)
company.create(chiefs2)
company.create(chiefs3)
company.create(subordinates1)
company.create(subordinates2)
company.create(subordinates3)


company.onChange()


company.update(1, {bid: 99e9})
company.update(2, {name: 'Vasya'})
company.update(3, {age: 91})

console.log(company.company)


// console.log(company.getChief('name', 'Kirill'))
// console.log(company.getChief('age', 91))
// console.log(company.getChief('telephone', '+380963703263'))

// console.log(company.getChiefAll())
// console.log(company.getSubordinatedAll())


// console.log(company.toJSON())
// company.delete(3)