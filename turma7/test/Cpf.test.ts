import Cpf from "../src/Cpf";

test('Should validate a valid CPF', () => {
    const cpf = new Cpf('606.530.329-19');
    expect(cpf).toBeDefined();
});

test('Should validate a valid CPF with digits only', () => {
    const cpf = new Cpf('60653032919');
    expect(cpf).toBeDefined();
});

test('Should validate a valid CPF ending with zero', () => {
    const cpf = new Cpf('252.135.716-20');
    expect(cpf).toBeDefined();
});

test('Should validate an invalid CPF', () => {
    expect(() => new Cpf('252.135.716-4X')).toThrowError('Invalid CPF');
});

test('Should validate an invalid CPF less digits', () => {
    expect(() => new Cpf('252.135')).toThrowError('Invalid CPF');
});

test('Should validate an invalid CPF more digits', () => {
    expect(() => new Cpf('3252.135.716-20')).toThrowError('Invalid CPF');
});

test('Should validate an invalid CPF same digits', () => {
    expect(() => new Cpf('111.111.111-11')).toThrowError('Invalid CPF');
});

test('Should validate an invalid CPF when null', () => {
    // @ts-ignore
    expect(() => new Cpf(null)).toThrowError('Invalid CPF');
});

test('Should validate an invalid CPF when undefined', () => {
    // @ts-ignore
    expect(() => new Cpf(undefined)).toThrowError('Invalid CPF');
});