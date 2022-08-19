import Segment from "./Segment";
import FeeCalculator from "./FeeCalculator";

const SUNDAY_OVERNIGHT_FEE = 5;

export default class SundayOvernightFeeCalculator implements FeeCalculator<Segment> {
    constructor(readonly next: FeeCalculator<Segment>) { }

    public calculate(segment: Segment): number {
        if (segment.isOvernight() && segment.isSunday()) {
            return segment.distance * SUNDAY_OVERNIGHT_FEE;
        }
        if (!this.next) throw new Error("No applicable calculator defined");
        return this.next.calculate(segment);
    }
}