import Item from "../entities/Item";

export default interface ItemRepository {
    save(item: Item): Promise<void>;
    findByIds(ids: string[]): Promise<Item[]>;
    findAll(): Promise<Item[]>;
}