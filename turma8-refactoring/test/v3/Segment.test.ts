import Segment from "../../src/v3/Segment";

test('Deve criar um segment valido', () => {
    const segment = new Segment(10, new Date("2022-09-17T13:00:00"));
    expect(segment).toBeDefined();
});

test('Deve lancar "Invalid distance" se distance for negativo', () => {
    expect(() => new Segment(-1, new Date("2022-09-17T13:00:00"))).toThrow(new Error("Invalid distance"));
});

test('Deve lancar "Invalid date" para data invalida' , () => {
    expect(() => new Segment(10, new Date("invalid"))).toThrow(new Error("Invalid date"));
});