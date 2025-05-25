import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}

export class UpdateCountryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}

export class CountryResponseDto {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
