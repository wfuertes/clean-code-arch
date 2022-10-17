import Item from "./Item";

const MIN_COST = 10;

export default class ShippingCostCalculator {

    static async calculate(distance: number, items: { weight: number, quantity: number }[]): Promise<number> {
        const total = items.reduce((total, item) => total + (distance * item.weight / 100.0) * item.quantity, 0);
        return total < MIN_COST ? MIN_COST : total;
    }
}