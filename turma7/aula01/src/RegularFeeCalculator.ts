import Segment from "./Segment";
import FeeCalculator from "./FeeCalculator";

const REGULAR_FEE = 2.10;

export default class SundayOverNightFeeCalculator implements FeeCalculator<Segment> {
    constructor(readonly next?: FeeCalculator<Segment>) { }

    public calculate(segment: Segment): number {
        if (!(segment.isOvernight() || segment.isSunday())) {
            return segment.distance * REGULAR_FEE;
        }
        if (!this.next) throw new Error("No applicable calculator defined");
        return this.next.calculate(segment);
    }
}