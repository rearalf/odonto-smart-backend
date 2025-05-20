import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from '../entities/specialty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async findById(id: number): Promise<Specialty> {
    const specialty = await this.specialtyRepository
      .createQueryBuilder('specialty')
      .select(['specialty.id', 'specialty.name', 'specialty.description'])
      .where('specialty.id = :id', { id })
      .getOne();

    if (!specialty) throw new NotFoundException('Especialidad no encontrada.');

    return specialty;
  }

  async getAllSpecialties(): Promise<Specialty[]> {
    const specialties = await this.specialtyRepository
      .createQueryBuilder('specialty')
      .select(['specialty.id', 'specialty.name', 'specialty.description'])
      .getMany();

    return specialties;
  }
}
