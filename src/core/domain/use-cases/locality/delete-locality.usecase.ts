import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../repository/locality.repository';

@Injectable()
export class DeleteLocalityUseCase {
  constructor(private readonly localityRepository: LocalityRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.localityRepository.delete(id);
  }
}
