import OrderItem from "../src/OrderItem";

test('Deve criar um order item valido', () => {
    const orderItem = new OrderItem('TV', 10, 2);
    expect(orderItem).toBeDefined();
    expect(orderItem.total()).toBe(20);
});

test('Nao deve criar um order item com preco menor que 0.01', () => {
    expect(() => new OrderItem('TV', 0.009, 1)).toThrow(new Error('Invalid price'));
});

test('Nao deve criar um order item com quantidade invalida', () => {
    expect(() => new OrderItem('TV', 10, 0)).toThrow(new Error('Invalid quantity'));
});