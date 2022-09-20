import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    private readonly orderItems: Map<string, OrderItem>;

    constructor(readonly cpf: Cpf) {
        this.orderItems = new Map<string, OrderItem>();
    }

    public addOrderItem(orderItem: OrderItem): void {
        const { item } = orderItem;
        if (this.orderItems.has(item.id)) {
            throw new Error(`Duplicated item: ${item.id}`);
        }
        this.orderItems.set(item.id, orderItem);
    }

    public total(): number {
        const orderTotal = Array.from(this.orderItems.values())
                                .reduce((total, orderItem) => total + orderItem.total(), 0)
        return orderTotal;
    }
}