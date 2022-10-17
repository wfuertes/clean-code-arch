import Cpf from "../domain/entities/Cpf";
import Order from "../domain/entities/Order";
import OrderRepository from "../domain/repositories/OrderRepository";
import RepositoryFactory from "../domain/repositories/RepositoryFactory";

export default class GetOrdersByCpf {
    private readonly orderRepository: OrderRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(cpf: string): Promise<Order[]> {
        return this.orderRepository.findByCpf(Cpf.of(cpf));
    }
}