import Dimension from "../src/domain/entities/Dimension";

test('Deve criar uma dimension valida', () => {
    const dimension = new Dimension(10, 10, 10, 1);
    expect(dimension).toBeDefined();
});

test('Deve calcular volume', () => {
    const dimension = new Dimension(100, 100, 100, 1);
    expect(dimension.volume()).toBe(1); // 1m³
});