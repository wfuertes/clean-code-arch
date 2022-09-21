import { calculateRide } from "../../src/v2/calculateRide";

test('Deve calcular o valor da corrida no domingo', () => {
    const fee = calculateRide([{ distance: 10, date: new Date("2022-09-18T12:00:00") }]);
    expect(fee).toBe(29);
});

test('Deve calcular o valor da corrida no domingo a noite', () => {
    const fee = calculateRide([{ distance: 10, date: new Date("2022-09-18T23:00:00") }]);
    expect(fee).toBe(50);
});

test('Deve calcular o valor da corrida', () => {
    const fee = calculateRide([{ distance: 10, date: new Date("2022-09-17T12:00:00") }]);
    expect(fee).toBe(21);
});

test('Deve calcular o valor da corrida a noite', () => {
    const fee = calculateRide([{ distance: 10, date: new Date("2022-09-17T23:00:00") }]);
    expect(fee).toBe(39);
});

test('Deve calcular o valor da corrida com valor minimo', () => {
    const fee = calculateRide([{ distance: 1, date: new Date("2022-09-17T13:00:00") }]);
    expect(fee).toBe(10);
});

test('Deve retornar lancar "Invalid distance" se distance for negativo', () => {
    expect(() => calculateRide([{ distance: -1, date: new Date("2022-09-17T13:00:00") }])).toThrow(new Error("Invalid distance"));
});

test('Deve retornar lancar "Invalid date" para data invalida' , () => {
    expect(() => calculateRide([{ distance: 10, date: new Date("invalid") }])).toThrow(new Error("Invalid date"));
});