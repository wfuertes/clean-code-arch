import Cpf from "../entities/Cpf";
import Order from "../entities/Order";

export type NextNumber = (nextNumber: number) => Order;

export default interface OrderRepository {
    findByCode(orderCode: string): Promise<Order | undefined>;
    save(order: Order): Promise<void>;
    count(): Promise<number>;
    findByCpf(cpf: Cpf): Promise<Order[]>;
}