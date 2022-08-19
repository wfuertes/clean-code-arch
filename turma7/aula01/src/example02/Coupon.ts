export enum CouponType {
    FLAT = 'FLAT',
    RATE = 'RATE'
}

export default class Coupon {
    private constructor(readonly value: number, readonly type: CouponType) {}

    public static rate(value: number) {
        return new Coupon(value, CouponType.RATE);
    }

    public static flat(value: number) {
        return new Coupon(value, CouponType.FLAT);
    }

    public apply(amount: number) {
        if (this.type === CouponType.FLAT) {
            return amount - this.value;
        }

        if (this.type === CouponType.RATE) {
            return amount * (1.0 - this.value / 100.0);
        }

        throw new Error("Invalid CouponType: " + this.type);
    }
}