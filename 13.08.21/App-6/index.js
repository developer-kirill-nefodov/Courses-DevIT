let iCh = 0, iSu = 0;

class Company {
    constructor() {
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

        if (this.boss.id === id) {
            this.boss = Object.assign(this.boss, data, {subordinates: this.chiefs});
            return
        }

        for (let x = 0; x < iCh + iSu; x++) {

            if (this.chiefs['idx' + x].id === id) {
                this.chiefs['idx' + x] = Object.assign(this.chiefs['idx' + x], data, {
                    subordinates: this.subordinates, chief: this.boss
                })
                return
            }
            if (this.subordinates['idx' + x].id === id) {
                this.subordinates['idx' + x] = Object.assign(this.subordinates['idx' + x], data, {
                    chief: this.chiefs
                })
                return
            }
        }
    }

    delete(id) {
        const idxB = this.boss.id === id

        if (idxB > 0) {
            this.boss = {place: 'unoccupied'};
            return
        }

        for (let y = 0; y < iCh + iSu; y++) {
            const idxC = this.chiefs['idx' + y].id === id
            const idxS = this.chiefs['idx' + y].id === id

            if (idxC > 0) {
                delete this.chiefs['idx' + y]
                return
            }

            if (idxS > 0) {
                delete this.subordinates['idx' + y]
                return
            }
        }
    }


    getChief(method, value) {

        for (let x = 0; x < iCh; x++) {
            const idxC = this.chiefs['idx' + x][method] === value

            if (idxC) {
                return this.chiefs['idx' + x]
            }
        }
        return 'person not found'
    }

    getChiefAll() {
        console.log("getChiefAll")
        return this.chiefs
    }


    getSubordinated(method, value) {
        for (let x = 0; x < iCh; x++) {
            const idxS = this.subordinates['idx' + x][method] === value

            if (idxS) {
                return this.subordinates['idx' + x]
            }
        }
        return 'person not found'
    }

    getSubordinatedAll() {
        console.log("getSubordinateAll")
        return this.subordinates
    }


    getAverageSalary() {
        let money = 0, am = 0;

        money += this.boss.bid
        am++
        for (let z = 0; z < iCh; z++) {
            if(this.chiefs['idx' + z].bid > 0) {
                console.log(this.chiefs['idx' + z].bid)
                money += this.chiefs['idx' + z].bid;
                am++
            }
        }
        for (let z = 0; z < iSu; z++) {
            if (this.subordinates['idx' + z].bid > 0){
                money += this.subordinates['idx' + z].bid;
                am++
            }
        }

        return money/am
    }

    // toJSON() {
    //     const a = Object.assign({}, this.boss, this.chiefs, this.subordinates)
    //     console.log(a)
    //     return JSON.stringify(a);
    // }

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

const subordinates1 = new Person({
    name: 'Maxim',
    surname: 'Xxx',
    age: 90,
    telephone: '+380963703262',
    email: 'maxim@gmail.com',
    bid: 20000,
    position: 'subordinate',
    id: 3
})

Company.prototype.create(bigBoss)
Company.prototype.create(chiefs1)
Company.prototype.create(subordinates1)

Company.prototype.update(1, {bid: 99e9})
Company.prototype.update(2, {name: 'Vasya'})
Company.prototype.update(3, {age: 91})

// Company.prototype.delete(3)

console.log(Company.prototype.getChief('name', 'Kirill'))
console.log(Company.prototype.getChief('age', 91))
console.log(Company.prototype.getChief('telephone', '+380963703263'))

console.log(Company.prototype.getChiefAll())
console.log(Company.prototype.getSubordinatedAll())


console.log(Company.prototype.toJSON())