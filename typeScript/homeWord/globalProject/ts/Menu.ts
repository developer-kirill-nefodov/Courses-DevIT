class Food {
    public type = 'food';

    public composFood: Array<object> = [
        {name: 'cheese', price: 8, composition: 14},
        {name: 'cutlet', price: 14, composition: 30},
        {name: 'meat', price: 17, composition: 40},
        {name: 'chocolate', price: 10, composition: 30},

    ]

    constructor(
        public name: string,
        public price: number,
        public calories: number,
        public composition: Array<number>,
    ) {
    }
}

const food1 = new Food('Hamburger', 57, 295, [0, 1, 2])
const food2 = new Food('Pizza', 43, 266, [0, 2])
const food3 = new Food('Donut', 54, 452, [3])


class Drinks {
    public type = 'drink';

    constructor(
        public name: string,
        public price: number,
        public calories: number) {
    }
}

const drink1 = new Drinks('Water', 0, 0);
const drink2 = new Drinks('Sprite', 20, 39);
const drink3 = new Drinks('Coca-Cola', 20, 38);


export {
    food1,
    food2,
    food3,
    drink1,
    drink2,
    drink3
}