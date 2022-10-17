import Cpf from "./Cpf";
import Coupon from "./Coupon";
import OrderItem from "./OrderItem";
import NumberUtils from "../utils/NumberUtils";

export default class Order {
    readonly items: OrderItem[];
    private coupon?: Coupon;
    private shippingCost?: number;

    constructor(readonly id: string, readonly cpf: Cpf, readonly createdAt: Date) {
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

    addShippingCost(shippingCost: number) {
        this.shippingCost = shippingCost;
    }

    total() {
        let total = this.items.reduce((total, orderItem) => total + orderItem.total(), 0);
        if (this.coupon) {
            total = total - this.coupon.discount(total, this.createdAt);
        }
        if (this.shippingCost) {
            total = total + this.shippingCost;
        }
        return NumberUtils.round(total, 2);
    }
}