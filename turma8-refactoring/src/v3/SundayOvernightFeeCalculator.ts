import FeeCalculator from "./FeeCalculator";
import Segment from "./Segment";

const SUNDAY_OVERNIGHT_FEE = 5;

export default class SundayOvernightFeeCalculator implements FeeCalculator {
    constructor(readonly next?: FeeCalculator) { }

    calculateFee(segment: Segment): number {
        if (segment.isOvernight() && segment.isSunday()) {
            return segment.distance * SUNDAY_OVERNIGHT_FEE;
        }
        if (this.next) {
            return this.next.calculateFee(segment);
        }
        throw new Error("No fee calculator found");
    }
} 