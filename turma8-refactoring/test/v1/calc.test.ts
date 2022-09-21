import { calc } from "../../src/v1/calc";

test('Deve calcular o valor da corrida no domingo', () => {
    const fee = calc([{ dist: 10, ds: new Date("2022-09-18T12:00:00") }]);
    expect(fee).toBe(29);
});

test('Deve calcular o valor da corrida no domingo a noite', () => {
    const fee = calc([{ dist: 10, ds: new Date("2022-09-18T23:00:00") }]);
    expect(fee).toBe(50);
});

test('Deve calcular o valor da corrida', () => {
    const fee = calc([{ dist: 10, ds: new Date("2022-09-17T12:00:00") }]);
    expect(fee).toBe(21);
});

test('Deve calcular o valor da corrida a noite', () => {
    const fee = calc([{ dist: 10, ds: new Date("2022-09-17T23:00:00") }]);
    expect(fee).toBe(39);
});

test('Deve calcular o valor da corrida com valor minimo', () => {
    const fee = calc([{ dist: 1, ds: new Date("2022-09-17T13:00:00") }]);
    expect(fee).toBe(10);
});

test('Deve retornar -2 se dist for invalido: string', () => {
    const fee = calc([{ dist: "a", ds: new Date("2022-09-17T13:00:00") }]);
    expect(fee).toBe(-1);
});

test('Deve retornar -2 se dist for invalido: negativo', () => {
    const fee = calc([{ dist: -1, ds: new Date("2022-09-17T13:00:00") }]);
    expect(fee).toBe(-1);
});

test('Deve retornar -2 se dist for invalido: null', () => {
    const fee = calc([{ dist: null, ds: new Date("2022-09-17T13:00:00") }]);
    expect(fee).toBe(-1);
});

test('Deve retornar -2 se dist for invalido: undefined', () => {
    const fee = calc([{ dist: undefined, ds: new Date("2022-09-17T13:00:00") }]);
    expect(fee).toBe(-1);
});

test('Deve retornar -2 se ds for invalido: string', () => {
    const fee = calc([{ dist: 10, ds: "a" }]);
    expect(fee).toBe(-2);
});

test('Deve retornar -2 se ds for invalido: null', () => {
    const fee = calc([{ dist: 10, ds: null }]);
    expect(fee).toBe(-2);
});

test('Deve retornar -2 se ds for invalido: undefined', () => {
    const fee = calc([{ dist: 10, ds: undefined }]);
    expect(fee).toBe(-2);
});