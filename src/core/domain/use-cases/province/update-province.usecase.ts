import { Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../../repository/province.repository';
import { Province } from '../../entities/province.entity';

@Injectable()
export class UpdateProvinceUseCase {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async execute(
    id: string,
    name: string,
    countryId: string,
  ): Promise<Province | null> {
    return await this.provinceRepository.update(id, name, countryId);
  }
}
