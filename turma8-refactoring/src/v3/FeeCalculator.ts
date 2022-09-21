import Segment from "./Segment";

export default interface FeeCalculator {
    next?: FeeCalculator;
    calculateFee(segments: Segment): number;
}