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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
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

@ApiTags('countries')
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
  @ApiOperation({ summary: 'Obtener todos los países' })
  @ApiResponse({
    status: 200,
    description: 'Lista de países obtenida exitosamente',
    type: [CountryResponseDto],
  })
  async getAllCountries(): Promise<CountryResponseDto[]> {
    const countries = await this.getCountriesUseCase.execute();
    return countries.map(
      (country) => new CountryResponseDto(country.id, country.name),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener país por ID' })
  @ApiParam({ name: 'id', description: 'ID del país', example: 'uuid-example' })
  @ApiResponse({
    status: 200,
    description: 'País encontrado',
    type: CountryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'País no encontrado' })
  async getCountryById(@Param('id') id: string): Promise<CountryResponseDto> {
    const country = await this.getCountryByIdUseCase.execute(id);
    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return new CountryResponseDto(country.id, country.name);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo país' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({
    status: 201,
    description: 'País creado exitosamente',
    type: CountryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async createCountry(
    @Body(ValidationPipe) createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.createCountryUseCase.execute(
      createCountryDto.name,
    );
    return new CountryResponseDto(country.id, country.name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un país existente' })
  @ApiParam({ name: 'id', description: 'ID del país', example: 'uuid-example' })
  @ApiBody({ type: UpdateCountryDto })
  @ApiResponse({
    status: 200,
    description: 'País actualizado exitosamente',
    type: CountryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'País no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
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
  @ApiOperation({ summary: 'Eliminar un país' })
  @ApiParam({ name: 'id', description: 'ID del país', example: 'uuid-example' })
  @ApiResponse({
    status: 200,
    description: 'País eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Country deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'País no encontrado' })
  async deleteCountry(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.deleteCountryUseCase.execute(id);
    if (!deleted) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Country deleted successfully' };
  }
}
