const composFood: Array<object> = [
    {name: 'cheese', price: 8, calories: 14},
    {name: 'cutlet', price: 14, calories: 30},
    {name: 'meat', price: 17, calories: 40},
    {name: 'chocolate', price: 10, calories: 30},
]

const composDrink: Array<object> = [
    {name: 'ice', price: 0, calories: 0},
    {name: 'syrup', price: 5, calories: 13},
    {name: 'milk', price: 3, calories: 9},
    {name: 'sugar', price: 0, calories: 10},
]

class Food {
    public type = 'food';
    name: string;
    price: number;
    calories: number;
    additive: Array<object>;

    constructor(name, price, calories, com) {
        this.name = name;
        this.price = price;
        this.calories = calories;

        this.additive = []
        for (let key of com) {
            this.additive.push(composFood[key])
        }
    }
}

const food1 = new Food('Hamburger', 57, 295, [0, 1, 2])
const food2 = new Food('Pizza', 43, 266, [0, 2])
const food3 = new Food('Donut', 54, 452, [3])


class Drinks {
    public type = 'drink';
    name: string;
    price: number;
    calories: number;
    additive: Array<object>;

    constructor(name, price, calories, com) {
        this.name = name;
        this.price = price;
        this.calories = calories;

        this.additive = []

        for (let key of com) {
            this.additive.push(composDrink[key])
        }
    }
}

const drink1 = new Drinks('Water', 0, 0, [0, 1, 2, 3]);
const drink2 = new Drinks('Sprite', 20, 39, [0, 1]);
const drink3 = new Drinks('Coca-Cola', 20, 38, [0, 1]);
export {food1, food2, food3, drink1, drink2, drink3}