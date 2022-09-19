import Item from "../src/Item";

test('Deve criar um item valido', () => {
    const item = new Item("Tv 40inch", 4000);
    expect(item).toBeDefined();
});

test('Nao deve criar um item com descricao invalida', () => {
    expect(() => new Item('', 4000)).toThrow(new Error('Invalid description'));
});

test('Nao deve criar um item com preco menor que 0.01', () => {
    expect(() => new Item('Tv 40inch', 0.009)).toThrow(new Error('Invalid price'));
});