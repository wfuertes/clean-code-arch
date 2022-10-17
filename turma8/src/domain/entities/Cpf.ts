export default class Cpf {
    private static readonly LENGTH = 11;

    public readonly value: string;

    constructor(cpf: string) {
        const validatedCpf = Cpf.validate(cpf);
        if (!validatedCpf) {
            throw new Error('Invalid CPF');
        }
        this.value = validatedCpf;
    }

    public static of(cpf: string) {
        return new Cpf(cpf);
    }

    private static validate(input: string): string | undefined {
        const cpf = input.replace(/[^\d]+/g, '');

        if (cpf.length !== Cpf.LENGTH || this.hasAllDigitsEqual(cpf)) {
            return undefined;
        }

        const firstDigit = this.calculateDigit(cpf, 10);
        const secondDigit = this.calculateDigit(cpf.slice(0, 9) + firstDigit, 11);
        const calculatedDigits = `${firstDigit}${secondDigit}`;

        if (calculatedDigits === cpf.slice(9)) {
            return cpf;
        }
        return undefined;
    }

    private static hasAllDigitsEqual(cpf: string) {
        const [firstDigit] = cpf;
        return cpf.split('').every(digit => digit === firstDigit);
    }

    private static calculateDigit(cpf: string, factor: 10 | 11) {
        let sum = 0;
        for (let num of cpf) {
            if (factor < 2) break;
            sum += parseInt(num) * factor--;
        }
        const rest = sum % Cpf.LENGTH;
        return (rest >= 2) ? Cpf.LENGTH - rest : 0;
    }
}