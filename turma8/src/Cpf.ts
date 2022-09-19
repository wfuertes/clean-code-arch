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

        if (cpf.length !== Cpf.LENGTH) {
            return undefined;
        }

        if (this.isSameDigit(cpf)) {
            return undefined;
        }

        const firstDigit = Cpf.calculateDigit(cpf.slice(0, 9));
        const secondDigit = Cpf.calculateDigit(cpf.slice(0, 9) + `${firstDigit}`);

        if (cpf.slice(-2) === `${firstDigit}${secondDigit}`) {
            return cpf;
        }
        return undefined;
    }

    private static isSameDigit(input: string) {
        for (let num = 0; num <= 9; num++) {
            const sameDigitCpf = Array(12).join(num.toString());
            if (input === sameDigitCpf) {
                return true;
            }
        }
        return false;
    }

    private static calculateDigit(input: string) {
        let factorSum = 0;
        for (let i = 0; i < input.length; i++) {
            const index = (input.length - 1) - i;
            const digit = parseInt(input[index]);
            factorSum += digit * (i + 2);
        }

        const rest = factorSum % Cpf.LENGTH;
        const verificationDigit = (rest >= 2) ? Cpf.LENGTH - rest : 0;
        return verificationDigit;
    }
}