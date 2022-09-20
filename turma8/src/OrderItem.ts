export default class OrderItem {
    constructor(readonly itemId: string, readonly price: number, readonly quantity: number) { 
        if (!itemId) {
            throw new Error('Invalid item id');
        }

        if (quantity <= 0) {
            throw new Error('Invalid quantity');
        }

        if (quantity < 1) {
            throw new Error('Invalid quantity');
        }
    }

    total() {
        return this.price * this.quantity;
    }
}