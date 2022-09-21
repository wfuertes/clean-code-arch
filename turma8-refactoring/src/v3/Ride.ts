import FeeCalculator from "./FeeCalculator";
import Segment from "./Segment";

const MINIMAL_FEE = 10;

export default class Ride {
	private readonly segments: Segment[] = [];

	constructor(private readonly feeCalculator: FeeCalculator) { }

	addSegment(segment: Segment) {
		this.segments.push(segment);
	};

	calculateFee(): number {
		const fee = this.segments.reduce((total, segment) => total + this.feeCalculator.calculateFee(segment), 0);
		return fee < MINIMAL_FEE ? MINIMAL_FEE : fee;
	}
}