import { Injectable } from '@nestjs/common';
import { Country } from '../../entities/country.entity';
import { CountryRepository } from '../../repository/country.repository';

@Injectable()
export class GetCountryByIdUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<Country | null> {
    return await this.countryRepository.findById(id);
  }
}
