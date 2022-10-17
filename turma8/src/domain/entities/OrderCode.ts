export default class OrderCode {
    constructor(private readonly date: Date, private readonly number: number) {
        if (date.toDateString() === 'Invalid Date') throw new Error('Invalid date');
        if (number < 1) throw new Error('Invalid number');
    }

    value(): string {
        return `${this.date.getFullYear()}${this.number.toString().padStart(8, '0')}`;
    }
}
