class Food {
    public type = 'food';

    constructor(
        public name: string,
        public price: number,
        public calories: number,
        public composition: Array<number>,
    ) {
    }
}

const food1 = new Food('Hamburger', 57, 295, [1, 2, 3, 4])
const food2 = new Food('Pizza', 43, 266, [1, 2, 3, 4])
const food3 = new Food('Donut', 54, 452, [1, 2, 3, 4])


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