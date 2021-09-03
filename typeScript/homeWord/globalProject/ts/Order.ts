export default class Order {

    constructor(
        public orderId: string,
        public orderStatus: string,
        public orderData: number,
        public orderName: string,
        public orderTel: string,
        public order: object
    ) {}
}