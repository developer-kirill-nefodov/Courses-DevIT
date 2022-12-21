type add = { name: string }

type data = {
  type: string,
  name: string,
  price: number,
  number: number,
  calories: number,
  additive: [add]
}

export default class Order {
  public structure: object = {
    orders: []
  }

  public temporaryOrd: Array<data> = [{
    type: '',
    name: 'test',
    price: 0,
    number: 0,
    calories: 0,
    additive: [{name: 'null'}]
  }]

  constructor(
    public orderId: number,
    public orderStatus: string,
    public orderData: Date,
  ) {
  }

  addOrd(data: data) {
    for (let idx of this.temporaryOrd) {
      if (idx.name === data.name) {
        for (let idx1 of data.additive) {
          for (let idx2 of idx.additive) {
            if (idx1.name === idx2.name) {
              idx.price += data.price;
              idx.number += data.number;
              idx.calories += data.calories;

              return `number = ${idx.number}`;
            }
          }
        }
      }
    }

    if (this.temporaryOrd[0].name === 'test') {
      Object.assign(this.temporaryOrd[0], data);
      return this.temporaryOrd
    }
    this.temporaryOrd.push(data)
    return this.temporaryOrd;
  }

  closeOrd() {
    this.structure['orders'].push(Object.assign(this.temporaryOrd, {
      order: {
        orderId: this.orderId,
        orderStatus: 'close',
        orderData: new Date(),
      }
    }));

    this.orderId++;
    this.orderData = new Date();
    this.temporaryOrd = [{type: '', name: '', price: 0, number: 0, calories: 0, additive: [{name: ''}]}];
    return this.structure['orders'][this.structure['orders'].length - 1]
  }
}
