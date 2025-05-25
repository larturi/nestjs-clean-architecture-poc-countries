import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Province } from '../../../../core/domain/entities/province.entity';
import { ProvinceRepository } from '../../../../core/domain/repository/province.repository';
import { Country } from 'src/core/domain/entities/country.entity';

@Injectable()
export class ProvinceRepositoryImpl implements ProvinceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Province[]> {
    const provinces = await this.prisma.province.findMany({
      orderBy: { name: 'asc' },
      include: {
        country: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return provinces.map((province) => {
      const country = province?.country
        ? new Country(province.country.id, province.country.name)
        : undefined;

      return new Province(
        province.id,
        province.countryId,
        province.name,
        country,
      );
    });
  }

  async findById(id: string): Promise<Province | null> {
    const province = await this.prisma.province.findUnique({
      where: { id },
    });
    return province
      ? new Province(province.id, province.countryId, province.name)
      : null;
  }

  async create(name: string, countryId: string): Promise<Province> {
    const province = await this.prisma.province.create({
      data: { name, countryId },
    });
    return new Province(province.id, province.countryId, province.name);
  }

  async update(
    id: string,
    name: string,
    countryId: string,
  ): Promise<Province | null> {
    try {
      const province = await this.prisma.province.update({
        where: { id },
        data: { name, countryId },
      });
      return new Province(province.id, province.countryId, province.name);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      // Primero verificar si la provincia existe
      const province = await this.prisma.province.findUnique({
        where: { id },
        include: { localities: true },
      });

      if (!province) {
        throw new Error(`Province with id ${id} not found`);
      }

      // Verificar si tiene localidades asociadas
      if (province.localities.length > 0) {
        throw new Error(
          `Cannot delete province ${id}. It has ${province.localities.length} associated localities`,
        );
      }

      await this.prisma.province.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting province:', error.message);
      throw error;
    }
  }
}
