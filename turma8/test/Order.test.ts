import Coupon from "../src/Coupon";
import Cpf from "../src/Cpf";
import Dimension from "../src/Dimension";
import Order from "../src/Order";
import OrderItem from "../src/OrderItem";

test('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    order.addItem(new OrderItem('1', 5000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('2', 4000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('3', 3000, 1, new Dimension(10, 10, 10, 1)));
    expect(order.items).toHaveLength(3);
});

test('Deve calcular o total', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    order.addItem(new OrderItem('1', 5000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('2', 4000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('3', 3000, 1, new Dimension(10, 10, 10, 1)));
    expect(order.total()).toBe(12000);
});

test('Deve calcular o total com cupom de desconto', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    order.addItem(new OrderItem('1', 5000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('2', 4000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('3', 3000, 1, new Dimension(10, 10, 10, 1)));
    order.addCoupon(new Coupon('VALE20', 20, new Date('2021-10-10')));
    expect(order.total()).toBe(9600);
});

test('Deve calcular o total com cupom de desconto expirado', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    order.addItem(new OrderItem('1', 5000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('2', 4000, 1, new Dimension(10, 10, 10, 1)));
    order.addItem(new OrderItem('3', 3000, 1, new Dimension(10, 10, 10, 1)));
    order.addCoupon(new Coupon('VALE20', 20, new Date('2021-09-10')));
    expect(order.total()).toBe(12000);
});

test('Deve calcular o custo de envio', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    order.addItem(new OrderItem('1_Camera', 5000, 1, new Dimension(20, 15, 10, 1)));
    order.addItem(new OrderItem('2_Guitarra', 5000, 1, new Dimension(100, 30, 10, 3)));
    order.addItem(new OrderItem('3_Geladeira', 5000, 1, new Dimension(200, 100, 50, 40)));
    expect(order.shippingCost(1000)).toBe(440);
});

test('Deve calcular o custo de envio com valor minimo', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    order.addItem(new OrderItem('1_Camera', 5000, 1, new Dimension(20, 15, 10, 0.5)));
    expect(order.shippingCost(1000)).toBe(10);
});

test('Nao deve adicionar item repetido', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf, new Date('2021-10-01'));
    expect(() => {
        const orderItem = new OrderItem('1', 5000, 1, new Dimension(10, 10, 10, 1));
        order.addItem(orderItem);
        order.addItem(orderItem);
    }).toThrow(new Error('Item already added'));
});