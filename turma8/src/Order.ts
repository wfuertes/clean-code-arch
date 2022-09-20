import Cpf from "./Cpf";
import Coupon from "./Coupon";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    readonly items: OrderItem[];
    private coupon?: Coupon;

    constructor(cpf: Cpf) {
        this.cpf = cpf;
        this.items = [];
    }

    addItem(orderItem: OrderItem) {
        if (this.items.find(({ itemId }) => itemId === orderItem.itemId)) {
            throw new Error('Item already added');
        }
        this.items.push(orderItem);
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    total() {
        const total = this.items.reduce((total, orderItem) => total + orderItem.total(), 0);
        if (this.coupon) {
            return Math.round((total - this.coupon.discount(total)) * 100) / 100;
        }
        return Math.round(total * 100) / 100;
    }
}