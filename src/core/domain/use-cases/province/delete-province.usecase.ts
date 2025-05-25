import { Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../../repository/province.repository';

@Injectable()
export class DeleteProvinceUseCase {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.provinceRepository.delete(id);
  }
}
