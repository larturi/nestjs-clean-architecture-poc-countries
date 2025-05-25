import { Province } from './province.entity';
import { Country } from './country.entity';

export class Locality {
  constructor(
    public readonly id: string,
    public readonly provinceId: string,
    public readonly name: string,
    public readonly province?: Province,
    public readonly country?: Country,
  ) {}
}
