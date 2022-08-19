import { validate } from "../../src/example02/cpf-legacy";

test('Should validate a valid CPF', () => {
    const isValid = validate('606.530.329-19');
    expect(isValid).toBe(true);
});

test('Should validate a valid CPF with digits only', () => {
    const isValid = validate('60653032919');
    expect(isValid).toBe(true);
});

test('Should validate a valid CPF ending with zero', () => {
    const isValid = validate('252.135.716-20');
    expect(isValid).toBe(true);
});

test('Should validate an invalid CPF', () => {
    const isValid = validate('252.135.716-4X');
    expect(isValid).toBe(false);
});

test('Should validate an invalid CPF less digits', () => {
    const isValid = validate('252.135');
    expect(isValid).toBe(false);
});

test('Should validate an invalid CPF more digits', () => {
    const isValid = validate('3252.135.716-20');
    expect(isValid).toBe(false);
});

test('Should validate an invalid CPF same digits', () => {
    const isValid = validate('111.111.111-11');
    expect(isValid).toBe(false);
});

test('Should validate an invalid CPF when null', () => {
    // @ts-ignore
    const isValid = validate(null);
    expect(isValid).toBe(false);
});

test('Should validate an invalid CPF when undefined', () => {
    // @ts-ignore
    const isValid = validate(undefined);
    expect(isValid).toBe(false);
});