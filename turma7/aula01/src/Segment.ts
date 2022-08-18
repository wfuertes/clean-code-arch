const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;

export default class Segment {
    constructor(readonly distance: number, readonly date: Date) {
        if (!this.isDistanceValid()) {
            throw new Error("Invalid distance");
        }
        if (!this.isDateValid()) {
            throw new Error("Invalid date");
        }
    }

    public isDistanceValid(): boolean {
        const { distance } = this;
        return distance != null && distance > 0;
    }

    public isDateValid(): boolean {
        const { date } = this;
        return date != null && isNaN(date.getTime()) !== true;
    }

    public isOvernight(): boolean {
        const { date } = this;
        const hour = date.getHours();
        return hour >= OVERNIGHT_START || hour <= OVERNIGHT_END;
    }

    public isSunday(): boolean {
        const { date } = this;
        return date.getDay() === 0;
    }
}