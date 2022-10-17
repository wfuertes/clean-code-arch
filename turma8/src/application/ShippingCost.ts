import DistanceCalculator from "../domain/entities/DistanceCalculator";
import ShippingCostCalculator from "../domain/entities/ShippingCostCalculator";
import PostalCodeRepository from "../domain/repositories/PostalCodeRepository";
import RepositoryFactory from "../domain/repositories/RepositoryFactory";

export type ShippingCostInput = {
    from: string;
    to: string;
    items: { weight: number, quantity: number }[];
}

export default class ShippingCost {
    private readonly postalCodeRepository: PostalCodeRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.postalCodeRepository = repositoryFactory.createPostalCodeRepository();
    }

    async calculate(input: ShippingCostInput): Promise<number> {
        const from = await this.postalCodeRepository.findByCode(input.from);
        const to = await this.postalCodeRepository.findByCode(input.to);
        if (!from || !to) throw new Error("Postal code not found");
        const distance = DistanceCalculator.calculateDistance(from.coordinate, to.coordinate);
        return ShippingCostCalculator.calculate(distance, input.items);
    }
}