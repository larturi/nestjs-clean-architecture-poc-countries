import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProvinceDto {
  @ApiProperty({
    description: 'Nombre de la provincia',
    example: 'Buenos Aires',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'ID del país al que pertenece la provincia',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(36)
  countryId: string;
}

export class UpdateProvinceDto {
  @ApiProperty({
    description: 'Nombre de la provincia',
    example: 'Buenos Aires',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'ID del país al que pertenece la provincia',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(36)
  countryId: string;
}

export class ProvinceResponseDto {
  @ApiProperty({
    description: 'ID de la provincia',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la provincia',
    example: 'Buenos Aires',
  })
  name: string;

  @ApiProperty({
    description: 'ID del país al que pertenece la provincia',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  countryId: string;

  @ApiProperty({
    description: 'Información del país',
    required: false,
  })
  country?: any;

  constructor(id: string, name: string, country?: any) {
    this.id = id;
    this.name = name;
    this.country = country;
  }
}
