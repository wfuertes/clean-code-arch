import { randomUUID } from "crypto";
import Item from "../src/Item";

test('Deve criar um item com preço válido', () => {
    const item = new Item(randomUUID(), 'TV 40 Polegadas', 399.90);
    expect(item).toBeDefined();
});

test('Deve criar um item com preço zero', () => {
    const item = new Item(randomUUID(), 'TV 40 Polegadas', 0);
    expect(item).toBeDefined();
});

test('Não deve criar um item com preço negativo', () => {
    const instantiation = () => new Item(randomUUID(), 'TV 40 Polegadas', -1399.90);
    expect(instantiation).toThrow('Price must be greather than zero')
});