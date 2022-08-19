export default class OrderItem {
    constructor(readonly name: string, readonly price: number, readonly quantity: number) {
    }

    public total() {
        return this.price * this.quantity;
    }
}