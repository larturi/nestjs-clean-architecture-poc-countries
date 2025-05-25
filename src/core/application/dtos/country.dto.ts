import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Nombre del país',
    example: 'Argentina',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}

export class UpdateCountryDto {
  @ApiProperty({
    description: 'Nombre del país',
    example: 'Argentina',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}

export class CountryResponseDto {
  @ApiProperty({
    description: 'ID único del país',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del país',
    example: 'Argentina',
  })
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
