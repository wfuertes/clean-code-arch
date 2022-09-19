import Item from "./Item";

export default class OrderItem {
    constructor(readonly item: Item, readonly quantity: number) { 
        if (quantity < 1) {
            throw new Error('Invalid quantity');
        }
    }
}