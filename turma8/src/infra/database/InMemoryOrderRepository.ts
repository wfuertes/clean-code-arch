import Cpf from "../../domain/entities/Cpf";
import Order from "../../domain/entities/Order";
import OrderRepository from "../../domain/repositories/OrderRepository";

export default class InMemoryOrderRepository implements OrderRepository {
    private readonly orders: Order[];

    constructor() {
        this.orders = [];
    }

    async findByCode(orderCode: string): Promise<Order | undefined> {
        return this.orders.find(order => order.id === orderCode);
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

    async findByCpf(cpf: Cpf): Promise<Order[]> {
        return this.orders.filter(order => order.cpf.value === cpf.value);
    }

}