import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../repository/locality.repository';
import { Locality } from '../../entities/locality.entity';

@Injectable()
export class CreateLocalityUseCase {
  constructor(private readonly localityRepository: LocalityRepository) {}

  async execute(name: string, provinceId: string): Promise<Locality> {
    return await this.localityRepository.create(name, provinceId);
  }
}
