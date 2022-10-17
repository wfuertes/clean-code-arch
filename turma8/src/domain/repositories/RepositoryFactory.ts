import ItemRepository from "./ItemRepository";
import OrderRepository from "./OrderRepository";
import PostalCodeRepository from "./PostalCodeRepository";

export default interface RepositoryFactory {
    createOrderRepository(): OrderRepository;
    createItemRepository(): ItemRepository;
    createPostalCodeRepository(): PostalCodeRepository;
}