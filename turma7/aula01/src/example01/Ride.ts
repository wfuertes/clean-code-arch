import FeeCalculator from "./FeeCalculator";
import Segment from "./Segment";

const SUNDAY_REGULAR_FEE = 2.9;
const SUNDAY_OVERNIGHT_FEE = 5;
const REGULAR_FEE = 2.10;
const REGULAR_OVERNIGHT_FEE = 3.9;
const MINIMAL_FEE = 10;

export default class Ride {
    constructor(readonly feeCalculator: FeeCalculator<Segment>, readonly segments: Segment[]) { }

    private static segmentFee(segment: Segment): number {
        if (segment.isOvernight()) {
            if (!segment.isSunday()) {
                return segment.distance * REGULAR_OVERNIGHT_FEE;
            }
            return segment.distance * SUNDAY_OVERNIGHT_FEE;
        }
        if (segment.isSunday()) {
            return segment.distance * SUNDAY_REGULAR_FEE;
        }
        return segment.distance * REGULAR_FEE;
    }

    public fee() {
        const { segments, feeCalculator } = this;
        const fee = segments.reduce((total, segment) => total + feeCalculator.calculate(segment), 0);
        return Math.max(fee, MINIMAL_FEE);
    }
}