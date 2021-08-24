class Food {
    constructor(name, price, calories, composition, supplements) {
        this.type = 'food'
        this.name = name;
        this.price = price;
        this.calories = calories;
        this.composition = composition;


    }
}

const food1 = new Food('Hamburger', 57, 295, 'Булочка Соус Котлета')
const food2 = new Food('Pizza', 43, 266, 'Ветчина Оливки Сыр Соус Масло')
const food3 = new Food('Donut', 54, 452, 'Молоко Дрожжи Сахар Мука')


class Drinks {
    constructor(name, price, calories) {
        this.type = 'drink'
        this.name = name
        this.price = price
        this.calories = calories
    }
}

const drink1 = new Drinks('Water', 0, 0);
const drink2 = new Drinks('Sprite',20,  39);
const drink3 = new Drinks('Coca-Cola', 20, 38);


export {
    food1,
    food2,
    food3,
    drink1,
    drink2,
    drink3
}