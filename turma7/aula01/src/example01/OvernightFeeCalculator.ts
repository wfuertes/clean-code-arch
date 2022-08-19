import Segment from "./Segment";
import FeeCalculator from "./FeeCalculator";

const OVERNIGHT_FEE = 3.9;

export default class OvernightFeeCalculator implements FeeCalculator<Segment> {
    constructor(readonly next: FeeCalculator<Segment>) { }

    public calculate(segment: Segment): number {
        if (segment.isOvernight() && !segment.isSunday()) {
            return segment.distance * OVERNIGHT_FEE;
        }
        if (!this.next) throw new Error("No applicable calculator defined");
        return this.next.calculate(segment);
    }
}