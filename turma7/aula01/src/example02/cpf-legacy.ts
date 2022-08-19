function isSameDigits(cpf: string): boolean {
  return [...cpf].every(char => char === cpf[0]);
}

function extractFactors(cpf: string): [number, number] {
    let factorOne = 0;
    let factorTwo = 0;
    for (let i = 1; i < cpf.length - 1; i++) {
        const digit = parseInt(cpf.substring(i - 1, i));
        factorOne += (11 - i) * digit;
        factorTwo += (12 - i) * digit;
    };
    return [factorOne, factorTwo];
}

export function validate(cpf: string) {
    if (!cpf) {
        return false;
    }

    cpf = cpf.replace(/\D/g, '');

    if (isSameDigits(cpf)) {
        return false;
    } 
    
    const [factorOne, factorTwo] = extractFactors(cpf);
    const factorOneRest = factorOne % 11;
    const digitOne = (factorOneRest < 2) ? 0 : 11 - factorOneRest;
    const factorTwoRest = (factorTwo + 2 * digitOne) % 11;
    const digitTwo = (factorTwoRest < 2) ? 0 : 11 - factorTwoRest;

    const verification = cpf.slice(-2);
    const expected = `${digitOne}${digitTwo}`;

    return verification === expected;
}