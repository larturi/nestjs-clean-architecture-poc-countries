import { Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../../repository/province.repository';
import { Province } from '../../entities/province.entity';

@Injectable()
export class CreateProvinceUseCase {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async execute(name: string, countryId: string): Promise<Province> {
    return await this.provinceRepository.create(name, countryId);
  }
}
