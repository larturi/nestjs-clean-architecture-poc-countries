import { Locality } from '../entities/locality.entity';

export abstract class LocalityRepository {
  abstract findAll(): Promise<Locality[]>;
  abstract findById(id: string): Promise<Locality | null>;
  abstract create(name: string, provinceId: string): Promise<Locality>;
  abstract update(
    id: string,
    name: string,
    provinceId: string,
  ): Promise<Locality | null>;
  abstract delete(id: string): Promise<boolean>;
}
