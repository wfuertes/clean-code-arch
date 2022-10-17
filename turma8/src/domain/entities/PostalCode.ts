import Coordinate from "./Coordinate";

export default class PostalCode {

    constructor(
        readonly code: string,
        readonly address: string,
        readonly city: string,
        readonly state: string,
        readonly coordinate: Coordinate) {

        if (!code) throw new Error('Invalid code');
        if (!address) throw new Error('Invalid address');
        if (!city) throw new Error('Invalid city');
        if (!state) throw new Error('Invalid state');
    }
}