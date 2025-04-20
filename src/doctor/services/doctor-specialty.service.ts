import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SpecialtyService } from './specialty.service';
import { DoctorSpecialty } from '../entities/doctor-specialty.entity';

@Injectable()
export class DoctorSpecialtyService {
  constructor(private readonly specialtyService: SpecialtyService) {}

  async create(
    manager: EntityManager,
    doctor_id: number,
    specialty_ids: number[],
  ): Promise<DoctorSpecialty[]> {
    const saved: DoctorSpecialty[] = [];

    for (const specialty_id of specialty_ids) {
      await this.specialtyService.findById(specialty_id);

      const createDoctorSpecialty = manager.create(DoctorSpecialty, {
        specialty_id,
        doctor_id,
      });

      const savedDoctorSpecialty = await manager.save(
        DoctorSpecialty,
        createDoctorSpecialty,
      );

      saved.push(savedDoctorSpecialty);
    }

    return saved;
  }
}
