export default class Coupon {
    readonly code: string;
    readonly percentage: number;
    readonly expiresAt: Date;

    constructor(code: string, percentage: number, expiresAt: Date) {
        if (!code) {
            throw new Error('Invalid code');
        }

        if (percentage < 0 || percentage > 100) {
            throw new Error('Invalid percentage');
        }

        if (expiresAt.toDateString() === "Invalid Date") {
            throw new Error('Invalid expires date');
        }

        this.code = code;
        this.percentage = percentage;
        this.expiresAt = expiresAt;
    }

    isExpired(date: Date) {
        return date > this.expiresAt;
    }

    discount(total: number, date: Date) {
        if (this.isExpired(date)) {
            return 0;
        }
        return total * this.percentage / 100;
    }
}