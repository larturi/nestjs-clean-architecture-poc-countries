import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocalityDto {
  @ApiProperty({
    description: 'Nombre de la localidad',
    example: 'La Plata',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'ID de la provincia a la que pertenece la localidad',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(36)
  provinceId: string;
}

export class UpdateLocalityDto {
  @ApiProperty({
    description: 'Nombre de la localidad',
    example: 'La Plata',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'ID de la provincia a la que pertenece la localidad',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(36)
  provinceId: string;
}

export class LocalityResponseDto {
  @ApiProperty({
    description: 'ID de la localidad',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la localidad',
    example: 'La Plata',
  })
  name: string;

  @ApiProperty({
    description: 'ID de la provincia a la que pertenece la localidad',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  provinceId: string;

  @ApiProperty({
    description: 'Información de la provincia',
    required: false,
  })
  province?: any;

  @ApiProperty({
    description: 'Información del país',
    required: false,
  })
  country?: any;

  constructor(id: string, name: string, province?: any, country?: any) {
    this.id = id;
    this.name = name;
    this.province = province;
    this.country = country;
  }
}
