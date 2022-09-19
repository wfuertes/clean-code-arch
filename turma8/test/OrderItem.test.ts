import Item from "../src/Item";
import OrderItem from "../src/OrderItem";

test('Deve criar um order item valido', () => {
    const orderItem = new OrderItem(new Item('TV', 10), 1);
    expect(orderItem).toBeDefined();
});

test('Nao deve criar um order item com quantidade invalida', () => {
    expect(() => new OrderItem(new Item('TV', 10), 0)).toThrow(new Error('Invalid quantity'));
});