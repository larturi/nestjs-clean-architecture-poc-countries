import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Locality } from '../../../../core/domain/entities/locality.entity';
import { LocalityRepository } from '../../../../core/domain/repository/locality.repository';

@Injectable()
export class LocalityRepositoryImpl implements LocalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Locality[]> {
    const localities = await this.prisma.locality.findMany({
      orderBy: { name: 'asc' },
    });
    return localities.map(
      (locality) =>
        new Locality(locality.id, locality.provinceId, locality.name),
    );
  }

  async findById(id: string): Promise<Locality | null> {
    const locality = await this.prisma.locality.findUnique({
      where: { id },
    });
    return locality
      ? new Locality(locality.id, locality.provinceId, locality.name)
      : null;
  }

  async create(name: string, provinceId: string): Promise<Locality> {
    const locality = await this.prisma.locality.create({
      data: { name, provinceId },
    });
    return new Locality(locality.id, locality.provinceId, locality.name);
  }

  async update(
    id: string,
    name: string,
    provinceId: string,
  ): Promise<Locality | null> {
    try {
      const locality = await this.prisma.locality.update({
        where: { id },
        data: { name, provinceId },
      });
      return new Locality(locality.id, locality.provinceId, locality.name);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.locality.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
