import OrderRepository from "../domain/repositories/OrderRepository";
import Order from "../domain/entities/Order"
import ItemRepository from "../domain/repositories/ItemRepository";
import Cpf from "../domain/entities/Cpf";
import OrderItem from "../domain/entities/OrderItem";
import Item from "../domain/entities/Item";
import OrderCode from "../domain/entities/OrderCode";
import RepositoryFactory from "../domain/repositories/RepositoryFactory";
import ShippingCostCalculator from "../domain/entities/ShippingCostCalculator";
import PostalCodeRepository from "../domain/repositories/PostalCodeRepository";
import DistanceCalculator from "../domain/entities/DistanceCalculator";

export type CheckoutItem = {
    itemId: string;
    quantity: number;
}

export type CheckoutInput = {
    cpf: string;
    date: Date;
    from: string;
    to: string;
    items: CheckoutItem[];
    coupon?: string;
}

export default class Checkout {
    private readonly itemRepository: ItemRepository;
    private readonly orderRepository: OrderRepository;
    private readonly postalCodeRepository: PostalCodeRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.postalCodeRepository = repositoryFactory.createPostalCodeRepository();
    }

    async execute(input: CheckoutInput): Promise<void> {
        const itemIds: string[] = input.items.map(item => item.itemId);
        const items: Item[] = await this.itemRepository.findByIds(itemIds);
        if (items.length !== input.items.length) throw new Error('Items not found');
        const ordersCount = await this.orderRepository.count();
        const orderCode = new OrderCode(input.date, ordersCount + 1);
        const order = new Order(orderCode.value(), Cpf.of(input.cpf), input.date);
        items.forEach(item => {
            const quantity = input.items.find(({ itemId }) => itemId === item.id)?.quantity;
            if (!quantity) throw new Error('Quantity not found');
            order.addItem(new OrderItem(item.id, item.price, quantity, item.dimension));
        });
        const from = await this.postalCodeRepository.findByCode(input.from);
        const to = await this.postalCodeRepository.findByCode(input.to);
        if (!from || !to) throw new Error("Postal code not found");
        const distance = DistanceCalculator.calculateDistance(from.coordinate, to.coordinate);
        const shippingCostItems = order.items.map(({ dimension, quantity }) => ({ weight: dimension.weightKg, quantity }));
        const shippingCost = await ShippingCostCalculator.calculate(distance, shippingCostItems);
        order.addShippingCost(shippingCost);
        await this.orderRepository.save(order);
    }
}