import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../repository/locality.repository';
import { Locality } from '../../entities/locality.entity';

@Injectable()
export class GetLocalityByIdUseCase {
  constructor(private readonly localityRepository: LocalityRepository) {}

  async execute(id: string): Promise<Locality | null> {
    return await this.localityRepository.findById(id);
  }
}
