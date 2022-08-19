import Coupon, { CouponType } from "../../src/example02/Coupon";
import Order from "../../src/example02/Order";
import OrderItem from "../../src/example02/OrderItem";

test('Não deve criar um pedido com cpf inválido', () => {
    expect(() => new Order('123CPF_INVALID', [])).toThrowError('Invalid CPF');
});

test('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const order = new Order('606.530.329-19', [
        new OrderItem('Televisao', 400, 1),
        new OrderItem('PS5', 5000, 1),
        new OrderItem('Horizon Zero Dawn', 200, 1)
    ]);
    expect(order.numberOfItems()).toBe(3);
})

test('Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)', () => {
    const order = new Order(
        '606.530.329-19',
        [new OrderItem('Televisao', 400, 2)],
        Coupon.rate(20)
    );
    expect(order.total()).toBe(640)
})