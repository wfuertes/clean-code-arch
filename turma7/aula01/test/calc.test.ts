import { calculateRide } from "../src/calc";

describe('Calculate Ride Fee', () => {
    test('should calculate overnight fee for weekdays and Saturday', () => {
        const segments = [{ distance: 10, date: new Date('2022-08-16T22:59:59') }];
        const fee = calculateRide(segments);
        expect(fee).toBe(39);
    });

    test('should calculate overnight fee on Sunday', () => {
        const segments = [{ distance: 10, date: new Date('2022-08-14T22:59:59') }];
        const fee = calculateRide(segments);
        expect(fee).toBe(50);
    });

    test('should calculate regular fee weekdays and Saturday', () => {
        const segments = [{ distance: 10, date: new Date('2022-08-16T21:59:59') }];
        const fee = calculateRide(segments);
        expect(fee).toBe(21);
    });

    test('should calculate regular fee on Sunday', () => {
        const segments = [{ distance: 10, date: new Date('2022-08-14T21:59:59') }];
        const fee = calculateRide(segments);
        expect(fee).toBe(29);
    });

    test('should return a minimal fee for rides under 10', () => {
        const segments = [{ distance: 1, date: new Date('2022-08-16T21:59:59') }];
        const fee = calculateRide(segments);
        expect(fee).toBe(10);
    });

    test('should throw "Invalid distance" if distance is not greather than zero', () => {
        const segments = [{ distance: -1, date: new Date('2022-08-16T21:59:59') }];
        const work = () => calculateRide(segments);
        expect(work).toThrowError('Invalid distance');
    });

    test('should throw "Invalid date" if date is invalid', () => {
        const segments = [{ distance: 10, date: new Date('INVALID') }];
        const work = () => calculateRide(segments);
        expect(work).toThrowError('Invalid date');
    });
});