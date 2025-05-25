import { Country } from './country.entity';

export class Province {
  constructor(
    public readonly id: string,
    public readonly countryId: string,
    public readonly name: string,
    public readonly country?: Country,
  ) {}
}
