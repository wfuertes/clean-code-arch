import FeeCalculator from "./FeeCalculator";
import Segment from "./Segment";

const WEEKDAY_FEE = 2.1;

export default class WeekdayFeeCalculator implements FeeCalculator {
    constructor(readonly next?: FeeCalculator) { }

    calculateFee(segment: Segment): number {
        if (!segment.isOvernight() && !segment.isSunday()) {
            return segment.distance * WEEKDAY_FEE;
        }
        if (this.next) {
            return this.next.calculateFee(segment);
        }
        throw new Error("No fee calculator found");
    }
} 