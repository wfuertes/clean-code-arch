import Coupon from "../src/domain/entities/Coupon";

test('Deve criar um coupon valido', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2021-10-10'));
    expect(coupon).toBeDefined();
});

test('Deve calcular disconto', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2021-10-10'));
    const currentDate = new Date('2021-10-01');
    expect(coupon.discount(110, currentDate)).toBe(22);
});

test('Nao deve criar um coupon com codigo invalido', () => {
    expect(() => new Coupon('', 20, new Date('2021-10-10'))).toThrow(new Error('Invalid code'));
});

test('Nao deve criar um coupon com percentual invalido', () => {
    expect(() => new Coupon('VALE20', -1, new Date('2021-10-10'))).toThrow(new Error('Invalid percentage'));
});

test('Nao deve criar um coupon com data de expiracao invalida', () => {
    expect(() => new Coupon('VALE20', 20, new Date('invalid'))).toThrow(new Error('Invalid expires date'));
});

test('Nao deve aplicar disconto se o coupon estiver expirado', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2020-10-10'));
    const currentDate = new Date('2021-10-10');
    expect(coupon.discount(100, currentDate)).toBe(0);
});