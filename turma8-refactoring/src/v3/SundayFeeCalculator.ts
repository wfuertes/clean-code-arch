import FeeCalculator from "./FeeCalculator";
import Segment from "./Segment";

const SUNDAY_FEE = 2.9;

export default class SundayFeeCalculator implements FeeCalculator {
    constructor(readonly next?: FeeCalculator) { }

    calculateFee(segment: Segment): number {
        if (!segment.isOvernight() && segment.isSunday()) {
            return segment.distance * SUNDAY_FEE;
        }
        if (this.next) {
            return this.next.calculateFee(segment);
        }
        throw new Error("No fee calculator found");
    }
} 