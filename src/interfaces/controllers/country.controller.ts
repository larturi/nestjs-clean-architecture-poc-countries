import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCountryUseCase } from '../../domain/use-cases/create-country.usecase';
import { UpdateCountryUseCase } from '../../domain/use-cases/update-country.usecase';
import { GetCountriesUseCase } from '../../domain/use-cases/get-countries.usecase';
import { GetCountryByIdUseCase } from '../../domain/use-cases/get-country-by-id.usecase';
import { DeleteCountryUseCase } from '../../domain/use-cases/delete-country.usecase';
import {
  CreateCountryDto,
  UpdateCountryDto,
  CountryResponseDto,
} from '../../application/dtos/country.dto';

@Controller('countries')
export class CountryController {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
    private readonly getCountriesUseCase: GetCountriesUseCase,
    private readonly getCountryByIdUseCase: GetCountryByIdUseCase,
    private readonly deleteCountryUseCase: DeleteCountryUseCase,
  ) {}

  @Get()
  async getAllCountries(): Promise<CountryResponseDto[]> {
    const countries = await this.getCountriesUseCase.execute();
    return countries.map(
      (country) => new CountryResponseDto(country.id, country.name),
    );
  }

  @Get(':id')
  async getCountryById(@Param('id') id: string): Promise<CountryResponseDto> {
    const country = await this.getCountryByIdUseCase.execute(id);
    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return new CountryResponseDto(country.id, country.name);
  }

  @Post()
  async createCountry(
    @Body(ValidationPipe) createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.createCountryUseCase.execute(
      createCountryDto.name,
    );
    return new CountryResponseDto(country.id, country.name);
  }

  @Put(':id')
  async updateCountry(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCountryDto: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.updateCountryUseCase.execute(
      id,
      updateCountryDto.name,
    );
    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return new CountryResponseDto(country.id, country.name);
  }

  @Delete(':id')
  async deleteCountry(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.deleteCountryUseCase.execute(id);
    if (!deleted) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Country deleted successfully' };
  }
}
