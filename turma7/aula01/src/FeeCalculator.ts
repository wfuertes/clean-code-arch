import RegularFeeCalculator from "./RegularFeeCalculator";
import OvernightFeeCalculator from "./OvernightFeeCalculator";
import SundayRegularFeeCalculator from "./SundayRegularFeeCalculator";
import SundayOvernightFeeCalculator from "./SundayOvernightFeeCalculator";
import SpecialDayFeeCalculator from "./SpecialDayFeeCalculator";

export default interface FeeCalculator<T> {
    calculate(value: T): number;
    next?: FeeCalculator<T>;
}

const regularFeeCalculator = new RegularFeeCalculator();
const overnightFeeCalculator = new OvernightFeeCalculator(regularFeeCalculator);
const sundayRegularFeeCalculator = new SundayRegularFeeCalculator(overnightFeeCalculator);
const sundayOvernightFeeCalculator = new SundayOvernightFeeCalculator(sundayRegularFeeCalculator);
const specialDayFeeCalculator = new SpecialDayFeeCalculator(sundayOvernightFeeCalculator);

export const feeCalculatorChain = specialDayFeeCalculator;