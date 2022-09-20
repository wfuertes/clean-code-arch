export default class Item {
    constructor(readonly id: string, readonly name: string, readonly price: number) {
        if (price < 0) throw new Error('Price must be greather than zero');
    }
}