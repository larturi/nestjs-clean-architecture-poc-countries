import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Country } from '../../../../domain/entities/country.entity';
import { CountryRepository } from '../../../../domain/repository/country.repository';

@Injectable()
export class CountryRepositoryImpl implements CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Country[]> {
    const countries = await this.prisma.country.findMany({
      orderBy: { name: 'asc' },
    });
    return countries.map((country) => new Country(country.id, country.name));
  }

  async findById(id: string): Promise<Country | null> {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });
    return country ? new Country(country.id, country.name) : null;
  }

  async create(name: string): Promise<Country> {
    const country = await this.prisma.country.create({
      data: { name },
    });
    return new Country(country.id, country.name);
  }

  async update(id: string, name: string): Promise<Country | null> {
    try {
      const country = await this.prisma.country.update({
        where: { id },
        data: { name },
      });
      return new Country(country.id, country.name);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.country.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
