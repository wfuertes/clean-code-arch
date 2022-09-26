import Cpf from "./Cpf";
import Coupon from "./Coupon";
import OrderItem from "./OrderItem";
import NumberUtils from "./NumberUtils";

export default class Order {
    readonly items: OrderItem[];
    private coupon?: Coupon;

    constructor(readonly cpf: Cpf, readonly issueDate: Date) {
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
            return Math.round((total - this.coupon.discount(total, this.issueDate)) * 100) / 100;
        }
        return NumberUtils.round(total, 2);
    }

    shippingCost(distance: number) {
        const cost = this.items.reduce((total, orderItem) => total + orderItem.shippingCost(distance), 0);
        return NumberUtils.round(cost < 10 ? 10 : cost, 2);
    }
}