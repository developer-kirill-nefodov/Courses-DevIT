abstract class Car {
    brand: string;

    protected constructor(brand: string) {
        this.brand = brand;
    }
}

class Bmw extends Car {
    public brand: string;

    constructor(
        brand: string,
        public model: string,
        public price: string,
        public overclocking: string
    ) {
        super(brand)
    }
}

class Mercedes extends Car {
    public brand: string;

    constructor(
        brand: string,
        public model: string,
        public price: string,
        public overclocking: string
    ) {
        super(brand)
    }
}

const bmw = new Bmw('Bmw', 'X5', '52900$', 'от 3.8 сек.')
const mercedes = new Mercedes('Mercedes', 'AMG GT 63', '269641$', 'от 3.4 сек.')

