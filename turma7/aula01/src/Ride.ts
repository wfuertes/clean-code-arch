import Segment from "./Segment";

const SUNDAY_OVERNIGHT_FEE = 5;
const WEEK_OVERNIGHT_FEE = 3.9;
const SUNDAY_REGULAR_FEE = 2.9;
const WEEK_REGULAR_FEE = 2.10;
const MINIMAL_FEE = 10;

export default class Ride {
    constructor(readonly segments: Segment[]) {
    }

    private static segmentFee(segment: Segment): number {
        if (segment.isOvernight()) {
            if (!segment.isSunday()) {
                return segment.distance * WEEK_OVERNIGHT_FEE;
            }
            return segment.distance * SUNDAY_OVERNIGHT_FEE;
        }
        if (segment.isSunday()) {
            return segment.distance * SUNDAY_REGULAR_FEE;
        }
        return segment.distance * WEEK_REGULAR_FEE;
    }

    public fee() {
        const { segments } = this;
        const fee = segments.reduce((total, segment) => total + Ride.segmentFee(segment), 0);
        return Math.max(fee, MINIMAL_FEE);
    }
}