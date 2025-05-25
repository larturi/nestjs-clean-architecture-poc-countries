import { Injectable } from '@nestjs/common';
import { Country } from '../../entities/country.entity';
import { CountryRepository } from '../../repository/country.repository';

@Injectable()
export class CreateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(name: string): Promise<Country> {
    return await this.countryRepository.create(name);
  }
}
