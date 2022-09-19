export default class Item {
    constructor(readonly descricao: string, readonly price: number) {
        if (!descricao) {
            throw new Error('Invalid description');
        }

        if (price < 0.01) {
            throw new Error('Invalid price');
        }
    }
}