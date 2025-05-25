import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Locality } from '../../../../core/domain/entities/locality.entity';
import { Province } from '../../../../core/domain/entities/province.entity';
import { Country } from '../../../../core/domain/entities/country.entity';
import { LocalityRepository } from '../../../../core/domain/repository/locality.repository';

@Injectable()
export class LocalityRepositoryImpl implements LocalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Locality[]> {
    const localities = await this.prisma.locality.findMany({
      orderBy: { name: 'asc' },
      include: {
        province: {
          include: {
            country: true,
          },
        },
      },
    });

    return localities.map((locality) => {
      const province = locality.province
        ? new Province(
            locality.province.id,
            locality.province.countryId,
            locality.province.name,
          )
        : undefined;

      const country = locality.province?.country
        ? new Country(
            locality.province.country.id,
            locality.province.country.name,
          )
        : undefined;

      return new Locality(
        locality.id,
        locality.provinceId,
        locality.name,
        province,
        country,
      );
    });
  }

  async findById(id: string): Promise<Locality | null> {
    const locality = await this.prisma.locality.findUnique({
      where: { id },
      include: {
        province: {
          include: {
            country: true,
          },
        },
      },
    });

    if (!locality) return null;

    const province = locality.province
      ? new Province(
          locality.province.id,
          locality.province.countryId,
          locality.province.name,
        )
      : undefined;

    const country = locality.province?.country
      ? new Country(
          locality.province.country.id,
          locality.province.country.name,
        )
      : undefined;

    return new Locality(
      locality.id,
      locality.provinceId,
      locality.name,
      province,
      country,
    );
  }

  async create(name: string, provinceId: string): Promise<Locality> {
    const locality = await this.prisma.locality.create({
      data: { name, provinceId },
      include: {
        province: {
          include: {
            country: true,
          },
        },
      },
    });

    const province = locality.province
      ? new Province(
          locality.province.id,
          locality.province.countryId,
          locality.province.name,
        )
      : undefined;

    const country = locality.province?.country
      ? new Country(
          locality.province.country.id,
          locality.province.country.name,
        )
      : undefined;

    return new Locality(
      locality.id,
      locality.provinceId,
      locality.name,
      province,
      country,
    );
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
        include: {
          province: {
            include: {
              country: true,
            },
          },
        },
      });

      const province = locality.province
        ? new Province(
            locality.province.id,
            locality.province.countryId,
            locality.province.name,
          )
        : undefined;

      const country = locality.province?.country
        ? new Country(
            locality.province.country.id,
            locality.province.country.name,
          )
        : undefined;

      return new Locality(
        locality.id,
        locality.provinceId,
        locality.name,
        province,
        country,
      );
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
