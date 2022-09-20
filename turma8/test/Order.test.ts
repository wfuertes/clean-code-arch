import Coupon from "../src/Coupon";
import Cpf from "../src/Cpf";
import Order from "../src/Order";
import OrderItem from "../src/OrderItem";

test('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf);
    order.addItem(new OrderItem('1', 5000, 1));
    order.addItem(new OrderItem('2', 4000, 1));
    order.addItem(new OrderItem('3', 3000, 1));
    expect(order.items).toHaveLength(3);
});

test('Deve calcular o total', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf);
    order.addItem(new OrderItem('1', 5000, 1));
    order.addItem(new OrderItem('2', 4000, 1));
    order.addItem(new OrderItem('3', 3000, 1));
    expect(order.total()).toBe(12000);
});

test('Deve calcular o total com cupom de desconto', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf);
    order.addItem(new OrderItem('1', 5000, 1));
    order.addItem(new OrderItem('2', 4000, 1));
    order.addItem(new OrderItem('3', 3000, 1));
    order.addCoupon(new Coupon('VALE20', 20));
    expect(order.total()).toBe(9600);
});

test('Nao deve adicionar item repetido', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf);
    expect(() => {
        const orderItem = new OrderItem('1', 5000, 1);
        order.addItem(orderItem);
        order.addItem(orderItem);
    }).toThrow(new Error('Item already added'));
});