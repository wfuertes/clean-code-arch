import Item from "../src/Item";
import OrderItem from "../src/OrderItem";

test('Deve criar um OrderItem válido', () => {
    const orderItem = new OrderItem(new Item('ID', 'TV', 10), 1);
    expect(orderItem).toBeDefined();
});

test('Não deve criar um OrderItem com quantidade negativa', () => {
    expect(() => new OrderItem(new Item('ID', 'TV', 10), -1)).toThrow('Invalid quantity: -1');
});

test('Não deve criar um OrderItem com quantidade igual a zero', () => {
    expect(() => new OrderItem(new Item('ID', 'TV', 10), 0)).toThrow('Invalid quantity: 0');
});

test('Deve calcular o total de acordo com a quantidade', () => {
    const orderItem = new OrderItem(new Item('ID', 'TV', 10), 5);
    expect(orderItem.total()).toBe(50);
});