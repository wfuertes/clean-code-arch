import NumberUtils from "../src/domain/utils/NumberUtils";

test('Deve arredondar para 2 casas decimais', () => {
    const value = NumberUtils.round(1.234, 2);
    expect(value).toBe(1.23);
});

test('Deve arredondar para 4 casas decimais', () => {
    const value = NumberUtils.round(1.23567, 4);
    expect(value).toBe(1.2357);
});