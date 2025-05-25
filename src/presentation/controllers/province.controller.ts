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

import { CreateProvinceUseCase } from 'src/core/domain/use-cases/province/create-province.usecase';

import {
  CreateProvinceDto,
  ProvinceResponseDto,
  UpdateProvinceDto,
} from '../../core/application/dtos/province.dto';
import { UpdateProvinceUseCase } from 'src/core/domain/use-cases/province/update-province.usecase';
import { GetProvincesUseCase } from 'src/core/domain/use-cases/province/get-provinces.usecase';
import { GetProvinceByIdUseCase } from 'src/core/domain/use-cases/province/get-province-by-id.usecase';
import { DeleteProvinceUseCase } from 'src/core/domain/use-cases/province/delete-province.usecase';

@ApiTags('provinces')
@Controller('provinces')
export class ProvinceController {
  constructor(
    private readonly createProvinceUseCase: CreateProvinceUseCase,
    private readonly updateProvinceUseCase: UpdateProvinceUseCase,
    private readonly getProvincesUseCase: GetProvincesUseCase,
    private readonly getProvinceByIdUseCase: GetProvinceByIdUseCase,
    private readonly deleteProvinceUseCase: DeleteProvinceUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las provincias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de provincias obtenida exitosamente',
    type: [ProvinceResponseDto],
  })
  async getAllProvinces(): Promise<ProvinceResponseDto[]> {
    const provinces = await this.getProvincesUseCase.execute();

    return provinces.map((province) => {
      const countryData = province.country
        ? {
            id: province.country.id,
            name: province.country.name,
          }
        : undefined;

      return new ProvinceResponseDto(province.id, province.name, countryData);
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener provincia por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la provincia',
    example: 'uuid-example',
  })
  @ApiResponse({
    status: 200,
    description: 'Provincia encontrada',
    type: ProvinceResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Provincia no encontrado' })
  async getProvinceById(@Param('id') id: string): Promise<ProvinceResponseDto> {
    const province = await this.getProvinceByIdUseCase.execute(id);
    if (!province) {
      throw new HttpException('Province not found', HttpStatus.NOT_FOUND);
    }
    return new ProvinceResponseDto(
      province.id,
      province.name,
      province.countryId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva provincia' })
  @ApiBody({ type: CreateProvinceDto })
  @ApiResponse({
    status: 201,
    description: 'Provincia creada exitosamente',
    type: ProvinceResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async createProvince(
    @Body(ValidationPipe) createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceResponseDto> {
    const province = await this.createProvinceUseCase.execute(
      createProvinceDto.name,
      createProvinceDto.countryId,
    );
    return new ProvinceResponseDto(
      province.id,
      province.name,
      province.countryId,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una provincia existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la provincia',
    example: 'uuid-example',
  })
  @ApiBody({ type: UpdateProvinceDto })
  @ApiResponse({
    status: 200,
    description: 'Provincia actualizada exitosamente',
    type: ProvinceResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Provincia no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async updateProvince(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceResponseDto> {
    const province = await this.updateProvinceUseCase.execute(
      id,
      updateProvinceDto.name,
      updateProvinceDto.countryId,
    );
    if (!province) {
      throw new HttpException('Province not found', HttpStatus.NOT_FOUND);
    }
    return new ProvinceResponseDto(
      province.id,
      province.name,
      province.countryId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una provincia' })
  @ApiParam({
    name: 'id',
    description: 'ID de la provincia',
    example: 'uuid-example',
  })
  @ApiResponse({
    status: 200,
    description: 'Provincia eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Province deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Provincia no encontrada' })
  @ApiResponse({
    status: 400,
    description:
      'La provincia no puede ser eliminada porque tiene localidades asociadas',
  })
  async deleteProvince(@Param('id') id: string): Promise<{ message: string }> {
    await this.deleteProvinceUseCase.execute(id);
    return { message: 'Province deleted successfully' };
  }
}
