import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../repository/locality.repository';
import { Locality } from '../../entities/locality.entity';

@Injectable()
export class UpdateLocalityUseCase {
  constructor(private readonly localityRepository: LocalityRepository) {}

  async execute(
    id: string,
    name: string,
    provinceId: string,
  ): Promise<Locality | null> {
    return await this.localityRepository.update(id, name, provinceId);
  }
}
