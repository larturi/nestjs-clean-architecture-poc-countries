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

import { CreateLocalityUseCase } from 'src/core/domain/use-cases/locality/create-locality.usecase';
import { UpdateLocalityUseCase } from 'src/core/domain/use-cases/locality/update-locality.usecase';
import { GetLocalitiesUseCase } from 'src/core/domain/use-cases/locality/get-localities.usecase';
import { GetLocalityByIdUseCase } from 'src/core/domain/use-cases/locality/get-locality-by-id.usecase';
import { DeleteLocalityUseCase } from 'src/core/domain/use-cases/locality/delete-locality.usecase';

import {
  CreateLocalityDto,
  LocalityResponseDto,
  UpdateLocalityDto,
} from '../../core/application/dtos/locality.dto';

@ApiTags('localities')
@Controller('localities')
export class LocalityController {
  constructor(
    private readonly createLocalityUseCase: CreateLocalityUseCase,
    private readonly updateLocalityUseCase: UpdateLocalityUseCase,
    private readonly getLocalitiesUseCase: GetLocalitiesUseCase,
    private readonly getLocalityByIdUseCase: GetLocalityByIdUseCase,
    private readonly deleteLocalityUseCase: DeleteLocalityUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las localidades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de localidades obtenida exitosamente',
    type: [LocalityResponseDto],
  })
  async getAllLocalities(): Promise<LocalityResponseDto[]> {
    const localities = await this.getLocalitiesUseCase.execute();
    return localities.map(
      (locality) =>
        new LocalityResponseDto(
          locality.id,
          locality.name,
          locality.provinceId,
        ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener localidad por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la localidad',
    example: 'uuid-example',
  })
  @ApiResponse({
    status: 200,
    description: 'Localidad encontrada',
    type: LocalityResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Localidad no encontrada' })
  async getLocalityById(@Param('id') id: string): Promise<LocalityResponseDto> {
    const locality = await this.getLocalityByIdUseCase.execute(id);
    if (!locality) {
      throw new HttpException('Locality not found', HttpStatus.NOT_FOUND);
    }
    return new LocalityResponseDto(
      locality.id,
      locality.name,
      locality.provinceId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva localidad' })
  @ApiBody({ type: CreateLocalityDto })
  @ApiResponse({
    status: 201,
    description: 'Localidad creada exitosamente',
    type: LocalityResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async createLocality(
    @Body(ValidationPipe) createLocalityDto: CreateLocalityDto,
  ): Promise<LocalityResponseDto> {
    const locality = await this.createLocalityUseCase.execute(
      createLocalityDto.name,
      createLocalityDto.provinceId,
    );
    return new LocalityResponseDto(
      locality.id,
      locality.name,
      locality.provinceId,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una localidad existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la localidad',
    example: 'uuid-example',
  })
  @ApiBody({ type: UpdateLocalityDto })
  @ApiResponse({
    status: 200,
    description: 'Localidad actualizada exitosamente',
    type: LocalityResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Localidad no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async updateLocality(
    @Param('id') id: string,
    @Body(ValidationPipe) updateLocalityDto: UpdateLocalityDto,
  ): Promise<LocalityResponseDto> {
    const locality = await this.updateLocalityUseCase.execute(
      id,
      updateLocalityDto.name,
      updateLocalityDto.provinceId,
    );
    if (!locality) {
      throw new HttpException('Locality not found', HttpStatus.NOT_FOUND);
    }
    return new LocalityResponseDto(
      locality.id,
      locality.name,
      locality.provinceId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una localidad' })
  @ApiParam({
    name: 'id',
    description: 'ID de la localidad',
    example: 'uuid-example',
  })
  @ApiResponse({
    status: 200,
    description: 'Localidad eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Locality deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Localidad no encontrada' })
  async deleteLocality(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.deleteLocalityUseCase.execute(id);
    if (!deleted) {
      throw new HttpException('Locality not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Locality deleted successfully' };
  }
}
