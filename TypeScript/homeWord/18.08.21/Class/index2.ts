abstract class Car {
  brand: string;
}

class Bmw extends Car {
  constructor(
    public brand: string,
    public model: string,
    public price: string,
    public overclocking: string
  ) {
    super();
  }

  getData(): string {
    return `brand: ${this.brand}, model: ${this.model}, price: ${this.price}`
  }
}

class Mercedes extends Car {

  constructor(
    public brand: string,
    public model: string,
    public price: string,
    public overclocking: string
  ) {
    super();
  }

  getData(): string {
    return `brand: ${this.brand}, model: ${this.model}, price: ${this.price}`
  }
}

const bmw = new Bmw('Bmw', 'X5', '52900$', 'от 3.8 сек.');
const mercedes = new Mercedes('Mercedes', 'AMG GT 63', '269641$', 'от 3.4 сек.');
