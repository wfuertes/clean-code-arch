import Item from "../../domain/entities/Item";
import ItemRepository from "../../domain/repositories/ItemRepository";

export default class InMemoryItemRepository implements ItemRepository {
    private readonly items: Item[];

    constructor() {
        this.items = [];
    }

    async save(item: Item): Promise<void> {
        this.items.push(item);
    }

    async findByIds(ids: string[]): Promise<Item[]> {
        return this.items.filter(item => ids.includes(item.id));
    }

    async findAll(): Promise<Item[]> {
        return this.items;
    }
}