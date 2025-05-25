import { Province } from '../entities/province.entity';
export abstract class ProvinceRepository {
  abstract findAll(): Promise<Province[]>;
  abstract findById(id: string): Promise<Province | null>;
  abstract create(name: string, countryId: string): Promise<Province>;
  abstract update(
    id: string,
    name: string,
    countryId: string,
  ): Promise<Province | null>;
  abstract delete(id: string): Promise<boolean>;
}
