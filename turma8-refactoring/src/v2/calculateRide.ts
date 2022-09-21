
const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;
const SUNDAY_OVERNIGHT_FEE = 5;
const SUNDAY_DAY_FEE = 2.9;
const WEEKDAY_DAY_FEE = 2.1;
const WEEKDAY_OVERNIGHT_FEE = 3.9;
const MINIMAL_FEE = 10;

const isOvernight = (date: Date) => date.getHours() >= OVERNIGHT_START || date.getHours() <= OVERNIGHT_END;
const isSunday = (date: Date) => date.getDay() === 0;

export function calculateRide(segments: { distance: number, date: Date }[]): number {
	let fee = 0;
	for (const segment of segments) {
		if (segment.distance <= 0) {
			throw new Error("Invalid distance");
		}
		if (segment.date.toString() === "Invalid Date") {
			throw new Error("Invalid date");
		}
		if (isOvernight(segment.date) && isSunday(segment.date)) {
			fee += segment.distance * SUNDAY_OVERNIGHT_FEE;
		}
		if (isOvernight(segment.date) && !isSunday(segment.date)) {
			fee += segment.distance * WEEKDAY_OVERNIGHT_FEE;
		}
		if (!isOvernight(segment.date) && isSunday(segment.date)) {
			fee += segment.distance * SUNDAY_DAY_FEE;
		}
		if (!isOvernight(segment.date) && !isSunday(segment.date)) {
			fee += segment.distance * WEEKDAY_DAY_FEE;
		}
	}
	return fee < MINIMAL_FEE ? MINIMAL_FEE : fee;
}