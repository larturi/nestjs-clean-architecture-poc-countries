import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../repository/locality.repository';
import { Locality } from '../../entities/locality.entity';

@Injectable()
export class GetLocalitiesUseCase {
  constructor(private readonly localityRepository: LocalityRepository) {}

  async execute(): Promise<Locality[]> {
    return await this.localityRepository.findAll();
  }
}
