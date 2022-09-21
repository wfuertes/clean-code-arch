const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;

export default class Segment {
    constructor(readonly distance: number, readonly date: Date) {
        if (distance <= 0) throw new Error("Invalid distance");
        if (date.toString() === "Invalid Date") throw new Error("Invalid date");
    }

    isOvernight(): boolean {
        return this.date.getHours() >= OVERNIGHT_START || this.date.getHours() <= OVERNIGHT_END;
    }

    isSunday(): boolean {
        return this.date.getDay() === 0;
    }
}