
const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;
const SUNDAY_OVERNIGHT_FEE = 5;
const WEEK_OVERNIGHT_FEE = 3.9;
const SUNDAY_REGULAR_FEE = 2.9;
const WEEK_REGULAR_FEE = 2.10;

const isOvernight = (date: Date): boolean => {
    const hour = date.getHours();
    return hour >= OVERNIGHT_START || hour <= OVERNIGHT_END;
}

const isSunday = (date: Date): boolean => {
    return date.getDay() === 0;
}

const isDistanceValid = (distance: number): boolean => {
    return distance != null && distance > 0;
}

const isDateValid = (date: Date): boolean => {
    return date != null && isNaN(date.getTime()) !== true;
}

const segmentFee = (segment: { distance: number, date: Date }): number => {
    if (!isDistanceValid(segment.distance)) {
        throw new Error("Invalid distance");
    }
    if (!isDateValid(segment.date)) {
        throw new Error("Invalid date");
    }
    if (isOvernight(segment.date)) {
        if (!isSunday(segment.date)) {
            return segment.distance * WEEK_OVERNIGHT_FEE;
        }
        return segment.distance * SUNDAY_OVERNIGHT_FEE;
    }
    if (isSunday(segment.date)) {
        return segment.distance * SUNDAY_REGULAR_FEE;
    }
    return segment.distance * WEEK_REGULAR_FEE;
}

export function calculateRide(segments: { distance: number, date: Date }[]) {
    const rideFee = segments.reduce((total, segment) => total + segmentFee(segment), 0);
    return Math.max(rideFee, 10);
}