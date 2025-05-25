import { Country } from '../entities/country.entity';

export abstract class CountryRepository {
  abstract findAll(): Promise<Country[]>;
  abstract findById(id: string): Promise<Country | null>;
  abstract create(name: string): Promise<Country>;
  abstract update(id: string, name: string): Promise<Country | null>;
  abstract delete(id: string): Promise<boolean>;
}
