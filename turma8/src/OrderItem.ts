import Dimension from "./Dimension";

export default class OrderItem {
    constructor(
        readonly itemId: string, 
        readonly price: number, 
        readonly quantity: number,
        readonly dimension: Dimension
    ) { 
        if (!itemId) {
            throw new Error('Invalid item id');
        }

        if (price < 0.01) {
            throw new Error('Invalid price');
        }

        if (quantity < 1) {
            throw new Error('Invalid quantity');
        }
    }

    total() {
        return this.price * this.quantity;
    }

    shippingCost(distance: number) {
        return distance * (this.dimension.weightKg / 100.0);
    }
}