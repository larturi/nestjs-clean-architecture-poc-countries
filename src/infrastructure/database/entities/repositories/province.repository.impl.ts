import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Province } from '../../../../core/domain/entities/province.entity';
import { ProvinceRepository } from '../../../../core/domain/repository/province.repository';

@Injectable()
export class ProvinceRepositoryImpl implements ProvinceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Province[]> {
    const provinces = await this.prisma.province.findMany({
      orderBy: { name: 'asc' },
    });
    return provinces.map(
      (province) =>
        new Province(province.id, province.name, province.countryId),
    );
  }

  async findById(id: string): Promise<Province | null> {
    const province = await this.prisma.province.findUnique({
      where: { id },
    });
    return province
      ? new Province(province.id, province.name, province.countryId)
      : null;
  }

  async create(name: string, countryId: string): Promise<Province> {
    const province = await this.prisma.province.create({
      data: { name, countryId },
    });
    return new Province(province.id, province.name, province.countryId);
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
      return new Province(province.id, province.name, province.countryId);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.province.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
