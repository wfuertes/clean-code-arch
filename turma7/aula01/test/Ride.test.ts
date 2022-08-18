import { calculateRide } from "../src/calc";
import Ride from "../src/Ride";
import Segment from "../src/Segment";

describe('Ride suite test', () => {
    test('should calculate overnight fee for weekdays and Saturday', () => {
        const segments = [new Segment(10, new Date('2022-08-16T22:59:59'))];
        const fee = new Ride(segments).fee();
        expect(fee).toBe(39);
    });

    test('should calculate overnight fee on Sunday', () => {
        const segments = [new Segment(10, new Date('2022-08-14T22:59:59'))];
        const fee = new Ride(segments).fee();
        expect(fee).toBe(50);
    });

    test('should calculate regular fee weekdays and Saturday', () => {
        const segments = [new Segment(10, new Date('2022-08-16T21:59:59'))];
        const fee = new Ride(segments).fee();
        expect(fee).toBe(21);
    });

    test('should calculate regular fee on Sunday', () => {
        const segments = [new Segment(10, new Date('2022-08-14T21:59:59'))];
        const fee = new Ride(segments).fee();
        expect(fee).toBe(29);
    });

    test('should return a minimal fee for rides under 10', () => {
        const segments = [new Segment(1, new Date('2022-08-16T21:59:59'))];
        const fee = new Ride(segments).fee();
        expect(fee).toBe(10);
    });
});