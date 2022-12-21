class Figure {
  constructor(options) {
    this.model = options.model;
  }
}

class Square extends Figure {
  constructor(options) {
    super(options)
    this.sideA = options.sideA
    this.sideB = options.sideB
  }

  area() {
    console.log(`area: ${this.sideA * this.sideB}`)
  }

  perimeter() {
    console.log(`perimeter: ${(this.sideA + this.sideB) * 2}`)
  }

  toJSON() {
    console.group()
    console.log(`model: ${this.model}`)
    this.area()
    this.perimeter()
    console.groupEnd()
  }
}


const square1 = new Square({model: 'square', sideA: 10, sideB: 10})
const square2 = new Square({model: 'rectangle', sideA: 10, sideB: 20})

// square1.toJSON()
// square2.toJSON()

class Circle extends Figure {
  constructor(options) {
    super(options);
    this.radius = options.radius
  }

  area() {
    console.log(`area: ${this.radius ** 2}π`)
  }

  perimeter() {
    console.log(`perimeter: ${this.radius * 2}π`)
  }

  toJSON() {
    console.group()
    console.log(`model: ${this.model}`)
    this.area()
    this.perimeter()
    console.groupEnd()
  }
}

const circle = new Circle({model: 'circle', radius: 20})

// circle.toJSON()


/**----**()**----**/

function DemoSqu(options) {
  this.model = options.model
  this.sideA = options.sideA
  this.sideB = options.sideB
}

DemoSqu.prototype.area = function () {
  console.log(`area: ${this.sideA * this.sideB}`)
}

DemoSqu.prototype.perimeter = function () {
  console.log(`perimeter: ${(this.sideA + this.sideB) * 2}`)
}

DemoSqu.prototype.toJSON = function () {
  console.group()
  console.log(`model: ${this.model}`)
  this.area()
  this.perimeter()
  console.groupEnd()
}

const demoSqu = new DemoSqu({model: 'square', sideA: 10, sideB: 10})
const demoSqu2 = new DemoSqu({model: 'rectangle', sideA: 10, sideB: 20})

// demoSqu.toJSON()
// demoSqu2.toJSON()
