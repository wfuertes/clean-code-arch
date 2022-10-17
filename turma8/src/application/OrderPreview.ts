import Cpf from "../domain/entities/Cpf";
import Order from "../domain/entities/Order";
import OrderItem from "../domain/entities/OrderItem";
import ItemRepository from "../domain/repositories/ItemRepository";
import RepositoryFactory from "../domain/repositories/RepositoryFactory";

export type OrderPreviewInput = {
    cpf: string;
    issueDate: Date;
    items: { id: string, quantity: number }[];
};

export type OrderPreviewOutput = {
    total: number;
};

export default class OrderPreview {
    private readonly itemRepository: ItemRepository;

    constructor(repositoryFactory: RepositoryFactory) { 
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    public async execute(input: OrderPreviewInput): Promise<OrderPreviewOutput> {
        const items = await this.itemRepository.findByIds(input.items.map(item => item.id));
        const order = new Order('DUMMY', Cpf.of(input.cpf), input.issueDate);
        for (const item of items) {
            const orderItem = new OrderItem(
                item.id,
                item.price,
                input.items.find(({ id }) => id === item.id)!.quantity,
                item.dimension
            );
            order.addItem(orderItem);
        }
        return { total: order.total() };
    }
}