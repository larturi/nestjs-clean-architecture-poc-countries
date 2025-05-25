import { Injectable } from '@nestjs/common';
import { Province } from '../../entities/province.entity';
import { ProvinceRepository } from '../../repository/province.repository';

@Injectable()
export class GetProvincesUseCase {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async execute(): Promise<Province[]> {
    return await this.provinceRepository.findAll();
  }
}
