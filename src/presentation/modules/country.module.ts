import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CountryController } from '../controllers/country.controller';

import { CountryRepository } from 'src/core/domain/repository/country.repository';
import { CountryRepositoryImpl } from 'src/infrastructure/database/entities/repositories/country.repository.impl';

// Use Cases
import { CreateCountryUseCase } from 'src/core/domain/use-cases/country/create-country.usecase';
import { DeleteCountryUseCase } from 'src/core/domain/use-cases/country/delete-country.usecase';
import { GetCountriesUseCase } from 'src/core/domain/use-cases/country/get-countries.usecase';
import { GetCountryByIdUseCase } from 'src/core/domain/use-cases/country/get-country-by-id.usecase';
import { UpdateCountryUseCase } from 'src/core/domain/use-cases/country/update-country.usecase';

@Module({
  controllers: [CountryController],
  providers: [
    PrismaService,
    CreateCountryUseCase,
    UpdateCountryUseCase,
    GetCountriesUseCase,
    GetCountryByIdUseCase,
    DeleteCountryUseCase,
    {
      provide: CountryRepository,
      useClass: CountryRepositoryImpl,
    },
  ],
  exports: [
    CountryRepository,
    CreateCountryUseCase,
    UpdateCountryUseCase,
    GetCountriesUseCase,
    GetCountryByIdUseCase,
    DeleteCountryUseCase,
  ],
})
export class CountryModule {}
