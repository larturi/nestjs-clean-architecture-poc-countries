import { Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../../repository/province.repository';
import { Province } from '../../entities/province.entity';

@Injectable()
export class GetProvinceByIdUseCase {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async execute(id: string): Promise<Province | null> {
    return await this.provinceRepository.findById(id);
  }
}
