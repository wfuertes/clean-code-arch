import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    readonly items: OrderItem[];

    constructor(cpf: Cpf) {
        this.cpf = cpf;
        this.items = [];
    }

    addItem(item: Item, quantity: number) {
        this.items.push(new OrderItem(item, quantity));
    }
}