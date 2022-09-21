import FeeCalculator from "./FeeCalculator";
import Segment from "./Segment";

const WEEKDAY_OVERNIGHT_FEE = 3.9;

export default class WeekdayOvernightFeeCalculator implements FeeCalculator {
    constructor(readonly next?: FeeCalculator) { }

    calculateFee(segment: Segment): number {
        if (segment.isOvernight() && !segment.isSunday()) {
            return segment.distance * WEEKDAY_OVERNIGHT_FEE;
        }
        if (this.next) {
            return this.next.calculateFee(segment);
        }
        throw new Error("No fee calculator found");
    }
} 