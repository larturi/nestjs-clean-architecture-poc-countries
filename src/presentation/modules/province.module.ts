import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ProvinceController } from '../controllers/province.controller';

import { ProvinceRepository } from 'src/core/domain/repository/province.repository';
import { ProvinceRepositoryImpl } from 'src/infrastructure/database/entities/repositories/province.repository.impl';

// Use Cases
import { CreateProvinceUseCase } from 'src/core/domain/use-cases/province/create-province.usecase';
import { GetProvincesUseCase } from 'src/core/domain/use-cases/province/get-provinces.usecase';
import { GetProvinceByIdUseCase } from 'src/core/domain/use-cases/province/get-province-by-id.usecase';
import { UpdateProvinceUseCase } from 'src/core/domain/use-cases/province/update-province.usecase';
import { DeleteProvinceUseCase } from 'src/core/domain/use-cases/province/delete-province.usecase';

@Module({
  controllers: [ProvinceController],
  providers: [
    PrismaService,
    CreateProvinceUseCase,
    UpdateProvinceUseCase,
    GetProvincesUseCase,
    GetProvinceByIdUseCase,
    DeleteProvinceUseCase,
    {
      provide: ProvinceRepository,
      useClass: ProvinceRepositoryImpl,
    },
  ],
  exports: [
    ProvinceRepository,
    CreateProvinceUseCase,
    UpdateProvinceUseCase,
    GetProvincesUseCase,
    GetProvinceByIdUseCase,
    DeleteProvinceUseCase,
  ],
})
export class ProvinceModule {}
