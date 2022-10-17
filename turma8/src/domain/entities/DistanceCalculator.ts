import Coordinate from "./Coordinate";

const EARTH_DIAMETER = 12742;
const DEG_TO_RAD = 0.017453292519943295; // Math.PI / 180

export default class DistanceCalculator {

    static calculateDistance(from: Coordinate, to: Coordinate): number {
        const angle = 0.5 - Math.cos((to.latitude - from.latitude) * DEG_TO_RAD) / 2.0
            + Math.cos(from.latitude * DEG_TO_RAD) * Math.cos(to.latitude * DEG_TO_RAD)
            * (1.0 - Math.cos((to.longitude - from.longitude) * DEG_TO_RAD)) / 2.0;
        return EARTH_DIAMETER * Math.asin(Math.sqrt(angle));
    }
}