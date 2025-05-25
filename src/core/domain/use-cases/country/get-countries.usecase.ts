import { Injectable } from '@nestjs/common';
import { Country } from '../../entities/country.entity';
import { CountryRepository } from '../../repository/country.repository';

@Injectable()
export class GetCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(): Promise<Country[]> {
    return await this.countryRepository.findAll();
  }
}
