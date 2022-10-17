import PostalCode from "../../domain/entities/PostalCode";
import PostalCodeRepository from "../../domain/repositories/PostalCodeRepository";

export default class InMemoryPostalCodeRepository implements PostalCodeRepository {
    private readonly postalCodes: PostalCode[] = [];

    async save(postalCode: PostalCode): Promise<void> {
        this.postalCodes.push(postalCode);
    }

    async findByCode(code: string): Promise<PostalCode | undefined> {
        return this.postalCodes.find(postalCode => postalCode.code === code);
    }
}