import Segment from "../../src/example01/Segment";

describe('Segment test suite', () => {
    test('should throw "Invalid distance" if distance is not greather than zero', () => {
        const work = () => new Segment(-1, new Date('2022-08-16T21:59:59'));
        expect(work).toThrowError('Invalid distance');
    });

    test('should throw "Invalid date" if date is invalid', () => {
        const work = () => new Segment(10, new Date('INVALID'));
        expect(work).toThrowError('Invalid date');
    });
});  