import NumberUtils from "../utils/NumberUtils";

export default class Dimension {
    constructor(
        readonly widthCm: number,
        readonly heightCm: number,
        readonly depthCm: number,
        readonly weightKg: number
    ) {
        if (widthCm < 0) {
            throw new Error('Invalid width');
        }

        if (heightCm < 0) {
            throw new Error('Invalid height');
        }

        if (depthCm < 0) {
            throw new Error('Invalid depth');
        }

        if (weightKg < 0) {
            throw new Error('Invalid weight');
        }
    }

    volume() {
        const volume = (this.widthCm / 100.0) * (this.heightCm / 100.0) * (this.depthCm / 100.0);
        return NumberUtils.round(volume, 2);
    }

    density() {
        return NumberUtils.round(this.weightKg / this.volume(), 2);
    }
}