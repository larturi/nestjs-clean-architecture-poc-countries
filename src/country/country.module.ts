import { Module } from '@nestjs/common';
import { CountryController } from '../interfaces/controllers/country.controller';
import { CreateCountryUseCase } from '../domain/use-cases/create-country.usecase';
import { UpdateCountryUseCase } from '../domain/use-cases/update-country.usecase';
import { GetCountriesUseCase } from '../domain/use-cases/get-countries.usecase';
import { GetCountryByIdUseCase } from '../domain/use-cases/get-country-by-id.usecase';
import { DeleteCountryUseCase } from '../domain/use-cases/delete-country.usecase';
import { CountryRepository } from '../domain/repository/country.repository';
import { CountryRepositoryImpl } from '../infrastructure/database/entities/repositories/country.repository.impl';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

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
