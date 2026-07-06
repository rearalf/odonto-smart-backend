import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';

import { DoctorSpecialty } from '../entities/doctor-specialty.entity';
import { Specialty } from '../entities/specialty.entity';

import { SpecialtyService } from './specialty.service';

@Injectable()
export class DoctorSpecialtyService {
  constructor(private readonly specialtyService: SpecialtyService) {}

  async create(
    manager: EntityManager,
    doctor_id: number,
    specialty_ids: number[],
  ): Promise<DoctorSpecialty[]> {
    const specialties = await manager.find(Specialty, {
      where: { id: In(specialty_ids) },
    });
    if (specialties.length !== specialty_ids.length)
      throw new NotFoundException('Una o más especialidades no existen.');

    const doctorSpecialties = specialty_ids.map((specialty_id) =>
      manager.create(DoctorSpecialty, { specialty_id, doctor_id }),
    );

    const savedDoctorSpecialty = await manager.save(
      DoctorSpecialty,
      doctorSpecialties,
    );

    return savedDoctorSpecialty;
  }
}
