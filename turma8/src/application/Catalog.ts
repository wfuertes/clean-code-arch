import Item from "../domain/entities/Item";
import ItemRepository from "../domain/repositories/ItemRepository";
import RepositoryFactory from "../domain/repositories/RepositoryFactory";

export default class Catalog {
    private readonly repository: ItemRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.repository = repositoryFactory.createItemRepository();
    }

    async list(): Promise<Item[]> {
        return this.repository.findAll();
    }
}