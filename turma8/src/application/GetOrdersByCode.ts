import Order from "../domain/entities/Order";
import OrderRepository from "../domain/repositories/OrderRepository";
import RepositoryFactory from "../domain/repositories/RepositoryFactory";

export type OrderListInput = {
    code: string;
}

export default class GetOrderByCode {
    private readonly orderRepository: OrderRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(orderCode: string): Promise<Order | undefined> {
        return this.orderRepository.findByCode(orderCode);
    }
}