import Segment from "./Segment";
import FeeCalculator from "./FeeCalculator";

const FLAT_FEE = 15;

export default class SpecialDayFeeCalculator implements FeeCalculator<Segment> {
    constructor(readonly next?: FeeCalculator<Segment>) { }

    public calculate(segment: Segment): number {
        if (segment.date.getMonth() === 8 && segment.date.getDate() === 7) {
            return FLAT_FEE;
        }
        if (!this.next) throw new Error("No applicable calculator defined");
        return this.next.calculate(segment);
    }
}