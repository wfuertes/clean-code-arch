import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    private readonly cpf: Cpf;

    constructor(cpf: string, readonly items: OrderItem[], readonly coupon?: Coupon) {
        this.cpf = new Cpf(cpf);
        this.items = items;
    }

    public numberOfItems() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    public total() {
        const total = this.items.reduce((orderTotal, item) => orderTotal + item.total(), 0);
        if (this.coupon) {
            return this.coupon.apply(total);
        }
        return total;
    }
}