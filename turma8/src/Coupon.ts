export default class Coupon {
    readonly code: string;
    readonly percentage: number;

    constructor(code: string, percentage: number) {
        if (!code) {
            throw new Error('Invalid code');
        }

        if (percentage < 0 || percentage > 100) {
            throw new Error('Invalid percentage');
        }

        this.code = code;
        this.percentage = percentage;
    }

    discount(total: number) {
        return total * this.percentage / 100;
    }
}