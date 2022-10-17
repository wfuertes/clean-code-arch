import Dimension from "./Dimension";

export default class Item {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly price: number,
        readonly dimension: Dimension
    ) {
        if (!id) {
            throw new Error('Invalid id');
        }

        if (!name) {
            throw new Error('Invalid name');
        }

        if (price < 0.01) {
            throw new Error('Invalid price');
        }
    }
}