import Coupon from "../src/Coupon";

test('Deve criar um coupon valido', () => {
    const coupon = new Coupon('VALE20', 20);
    expect(coupon).toBeDefined();
});

test('Deve calcular disconto', () => {
    const coupon = new Coupon('VALE20', 20);
    expect(coupon.discount(110)).toBe(22);
});

test('Nao deve criar um coupon com codigo invalido', () => {
    expect(() => new Coupon('', 20)).toThrow(new Error('Invalid code'));
});

test('Nao deve criar um coupon com percentual invalido', () => {
    expect(() => new Coupon('VALE20', -1)).toThrow(new Error('Invalid percentage'));
});