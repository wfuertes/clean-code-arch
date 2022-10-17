export default class NumberUtils {
    static round(value: number, precision: number) {
        const multiplier = 10 ** precision;
        return Math.round(value * multiplier) / multiplier;
    }
}