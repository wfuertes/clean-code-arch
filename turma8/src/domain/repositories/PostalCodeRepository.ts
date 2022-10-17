import PostalCode from "../entities/PostalCode";

export default interface PostalCodeRepository {
    save(postalCode: PostalCode): Promise<void>;
    findByCode(code: string): Promise<PostalCode | undefined>;
}