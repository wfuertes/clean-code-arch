import Cpf from "../src/Cpf";
import Item from "../src/Item";
import Order from "../src/Order";
import OrderItem from "../src/OrderItem";

test('Deve criar um pedido com vários items', () => {
    const order = new Order(new Cpf('606.530.329-19'));
    order.addOrderItem(new OrderItem(new Item('ID_1', 'TV', 10), 1));
    order.addOrderItem(new OrderItem(new Item('ID_2', 'PS5', 1000), 1));
    expect(order).toBeDefined();
});

test('Não deve adicionar item duplicado ao pedido', () => {
    expect(() => {
        const order = new Order(new Cpf('606.530.329-19'));
        order.addOrderItem(new OrderItem(new Item('ID', 'TV', 10), 1));
        order.addOrderItem(new OrderItem(new Item('ID', 'TV', 10), 1));
    }).toThrow('Duplicated item: ID');
});

test('Deve calcular o total do pedido', () => {
    const order = new Order(new Cpf('606.530.329-19'));
    order.addOrderItem(new OrderItem(new Item('ID_1', 'TV', 400), 1));
    order.addOrderItem(new OrderItem(new Item('ID_2', 'PS5', 5000), 1));
    expect(order.total()).toBe(5400);
});