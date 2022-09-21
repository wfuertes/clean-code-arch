import Ride from '../../src/v3/Ride';
import Segment from '../../src/v3/Segment';
import SundayFeeCalculator from '../../src/v3/SundayFeeCalculator';
import SundayOvernightFeeCalculator from '../../src/v3/SundayOvernightFeeCalculator';
import WeekdayFeeCalculator from '../../src/v3/WeekdayFeeCalculator';
import WeekdayOvernightFeeCalculator from '../../src/v3/WeekdayOvernightFeeCalculator';

let ride: Ride;

beforeEach(() => {
    const sundayFeeCalculator = new SundayFeeCalculator();
    const weekdayFeeCalculator = new WeekdayFeeCalculator(sundayFeeCalculator);
    const weekdayOvernightFeeCalculator = new WeekdayOvernightFeeCalculator(weekdayFeeCalculator);
    const sundayOvernightFeeCalculator = new SundayOvernightFeeCalculator(weekdayOvernightFeeCalculator);
    ride = new Ride(sundayOvernightFeeCalculator);
});

test('Deve calcular o valor da corrida no domingo', () => {
    ride.addSegment(new Segment(10, new Date("2022-09-18T12:00:00")));
    expect(ride.calculateFee()).toBe(29);
});

test('Deve calcular o valor da corrida no domingo a noite', () => {
    ride.addSegment(new Segment(10, new Date("2022-09-18T23:00:00")));
    expect(ride.calculateFee()).toBe(50);
});

test('Deve calcular o valor da corrida', () => {
    ride.addSegment(new Segment(10, new Date("2022-09-17T12:00:00")));
    expect(ride.calculateFee()).toBe(21);
});

test('Deve calcular o valor da corrida a noite', () => {
    ride.addSegment(new Segment(10, new Date("2022-09-17T23:00:00")));
    expect(ride.calculateFee()).toBe(39);
});

test('Deve calcular o valor da corrida com valor minimo', () => {
    ride.addSegment(new Segment(1, new Date("2022-09-17T13:00:00")));
    expect(ride.calculateFee()).toBe(10);
});