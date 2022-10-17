import Cpf from "../src/domain/entities/Cpf";

test('Deve criar instância com CPF valido', () => {
    const cpf = new Cpf('013.955.728-87');
    expect(cpf.value).toBe('01395572887');
});

test('Não deve permitir CPF inválido', () => {
    expect(() => new Cpf('013.955.728-00')).toThrow(new Error('Invalid CPF'));
});

test('Não deve permitir CPF faltando caracteres', () => {
    expect(() => new Cpf('013.955')).toThrow(new Error('Invalid CPF'));
});

test('Não deve permitir CPF com caracteres extras', () => {
    expect(() => new Cpf('013.955.728-87.98')).toThrow(new Error('Invalid CPF'));
});

test.each([1, 2, 3, 4, 5, 6, 7, 8, 9])('Não deve permitir CPF todos os digitos iguais à %s', (digit) => {
    const value = Array(12).join(digit.toString());
    expect(() => new Cpf(value)).toThrow(new Error('Invalid CPF'));
});