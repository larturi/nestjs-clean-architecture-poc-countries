import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { LocalityController } from '../controllers/locality.controller';

import { LocalityRepository } from 'src/core/domain/repository/locality.repository';
import { LocalityRepositoryImpl } from 'src/infrastructure/database/entities/repositories/locality.repository.impl';

// Use Cases
import { CreateLocalityUseCase } from 'src/core/domain/use-cases/locality/create-locality.usecase';
import { GetLocalitiesUseCase } from 'src/core/domain/use-cases/locality/get-localities.usecase';
import { GetLocalityByIdUseCase } from 'src/core/domain/use-cases/locality/get-locality-by-id.usecase';
import { UpdateLocalityUseCase } from 'src/core/domain/use-cases/locality/update-locality.usecase';
import { DeleteLocalityUseCase } from 'src/core/domain/use-cases/locality/delete-locality.usecase';

@Module({
  controllers: [LocalityController],
  providers: [
    PrismaService,
    CreateLocalityUseCase,
    UpdateLocalityUseCase,
    GetLocalitiesUseCase,
    GetLocalityByIdUseCase,
    DeleteLocalityUseCase,
    {
      provide: LocalityRepository,
      useClass: LocalityRepositoryImpl,
    },
  ],
  exports: [
    LocalityRepository,
    CreateLocalityUseCase,
    UpdateLocalityUseCase,
    GetLocalitiesUseCase,
    GetLocalityByIdUseCase,
    DeleteLocalityUseCase,
  ],
})
export class LocalityModule {}
