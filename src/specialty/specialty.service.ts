import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { DataSource } from 'typeorm';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(Specialty);

      const created = repository.create({
        name: createSpecialtyDto.name,
        description: createSpecialtyDto.description,
      });

      const saved = await repository.save(created);

      return {
        specialty: saved,
      };
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(Specialty);

      const specialties = await repository
        .createQueryBuilder('specialty')
        .select(['specialty.id', 'specialty.name', 'specialty.description'])
        .getMany();

      return {
        specialties,
      };
    });
  }

  async findOneById(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(Specialty);

      const specialty = await repository
        .createQueryBuilder('specialty')
        .where('specialty.id = :id', { id })
        .select([
          'specialty.id',
          'specialty.name',
          'specialty.description',
          'specialty.create_at',
          'specialty.update_at',
        ])
        .getOne();

      if (!specialty) throw new NotFoundException(`Speialty not found`);

      return {
        specialty,
      };
    });
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(Specialty);

      const specialty = await this.findOneById(id);

      if (!specialty) throw new NotFoundException(`Speialty not found`);

      const fieldsToUpdate: Partial<Specialty> = {};

      if (updateSpecialtyDto.name)
        fieldsToUpdate.name = updateSpecialtyDto.name;
      if (updateSpecialtyDto.description)
        fieldsToUpdate.description = updateSpecialtyDto.description;

      const updated = await repository
        .createQueryBuilder('specialty')
        .update(Specialty)
        .set(fieldsToUpdate)
        .where('specialty.id = :id', { id })
        .execute();

      const specialtyUpdated = await this.findOneById(id);

      return {
        affected: updated.affected,
        specialty: specialtyUpdated.specialty,
      };
    });
  }

  async remove(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(Specialty);

      const specialty = await this.findOneById(id);
      if (!specialty) throw new NotFoundException(`Speialty not found`);

      const deleted = await repository
        .createQueryBuilder('specialty')
        .softDelete()
        .where('specialty.id = :id', { id })
        .execute();

      return {
        affected: deleted.affected,
        specialty: specialty.specialty,
      };
    });
  }
}
