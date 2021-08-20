import {person1} from "./src/person/person.js";

class FastFood {
    constructor(address, title) {
        this.address = address;
        this.title = title
    }
}

class Saloon extends FastFood {

    structure = {
        title: this.title,
        address: this.address,
        staff: [],
        menu: []
    }

    constructor(address, title) {
        super(address, title);
    }

    addStaff(data) {
        let newStaff = {}

        if (data.age < 18) {
            return 'Мы вам перезвонем!!!'
        }

        if (data.experienceWork <= 2) {
            newStaff = Object.assign({}, data, {position: 'assistant', salary: 9000});
            this.structure.staff.push(newStaff)
            console.log(this.structure)
            return (
                `${newStaff.name} принять на должность ${newStaff.position} зарплата составляет ${newStaff.salary}грн.`
            )
        }

        if (data.experienceWork > 2) {
            newStaff = Object.assign({}, data, {position: 'salesman', salary: 15000});
            this.structure.staff.push(newStaff)
            console.log(this.structure)
            return (
                `${newStaff.name} принять на должность ${newStaff.position} зарплата составляет ${newStaff.salary}грн.`)
        }
    }

    addMenu(data) {
        if(this.structure.menu.filter(data.name)) return `Есть в меню`;


    }
}

const salon = new Saloon('Новгородська вулиця, 5-7', 'Кебаб Хаус')

salon.addStaff(person1)

// console.log(salon.structure)

