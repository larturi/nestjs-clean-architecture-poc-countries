import { Injectable } from '@nestjs/common';
import { Country } from '../../domain/entities/country.entity';
import { CountryRepository } from '../../domain/repository/country.repository';

@Injectable()
export class UpdateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string, name: string): Promise<Country | null> {
    return await this.countryRepository.update(id, name);
  }
}
