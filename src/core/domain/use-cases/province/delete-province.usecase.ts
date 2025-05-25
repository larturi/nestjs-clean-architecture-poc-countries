import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProvinceRepository } from '../../repository/province.repository';

@Injectable()
export class DeleteProvinceUseCase {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      return await this.provinceRepository.delete(id);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(`Province with id ${id} not found`);
      }
      if (error.message.includes('associated localities')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
