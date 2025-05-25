import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../../repository/country.repository';

@Injectable()
export class DeleteCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.countryRepository.delete(id);
  }
}
