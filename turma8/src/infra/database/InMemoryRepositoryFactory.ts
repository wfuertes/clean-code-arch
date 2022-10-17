import ItemRepository from "../../domain/repositories/ItemRepository";
import OrderRepository from "../../domain/repositories/OrderRepository";
import PostalCodeRepository from "../../domain/repositories/PostalCodeRepository";
import RepositoryFactory from "../../domain/repositories/RepositoryFactory";
import InMemoryItemRepository from "./InMemoryItemRepository";
import InMemoryOrderRepository from "./InMemoryOrderRepository";
import InMemoryPostalCodeRepository from "./InMemoryPostalCodeRepository";

export default class InMemoryRepositoryFactory implements RepositoryFactory {

    private orderRepository: OrderRepository | undefined;
    private itemRepository: ItemRepository | undefined;
    private postalCodeRepository: PostalCodeRepository | undefined;

    createOrderRepository(): OrderRepository {
        if (!this.orderRepository) {
            this.orderRepository = new InMemoryOrderRepository();
        }
        return this.orderRepository;
    }

    createItemRepository(): ItemRepository {
        if (!this.itemRepository) {
            this.itemRepository = new InMemoryItemRepository();
        }
        return this.itemRepository;
    }

    createPostalCodeRepository(): PostalCodeRepository {
        if (!this.postalCodeRepository) {
            this.postalCodeRepository = new InMemoryPostalCodeRepository();
        }
        return this.postalCodeRepository;
    }
}