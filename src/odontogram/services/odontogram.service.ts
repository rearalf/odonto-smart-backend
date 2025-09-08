import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Odontogram } from '../entities/odontogram.entity';
import { ToothDto } from '../dto/tooth.dto';
import { ToothService } from './tooth.service';

@Injectable()
export class OdontogramService {
  constructor(
    @InjectRepository(Odontogram)
    private readonly odontogramRepository: Repository<Odontogram>,
    private readonly toothService: ToothService,
  ) {}

  async findOdontogram(
    type: 'patient' | 'appointment',
    id: number,
  ): Promise<Odontogram | null> {
    const query = this.odontogramRepository
      .createQueryBuilder('odontogram')
      .leftJoinAndSelect('odontogram.tooth', 'tooth');

    if (type === 'patient') {
      query
        .where('odontogram.patient_id = :id', { id })
        .orderBy('odontogram.created_at', 'DESC')
        .limit(1);
    } else if (type === 'appointment') {
      query
        .where('odontogram.appointment_id = :id', { id })
        .andWhere('odontogram.patient_id IS NOT NULL');
    }

    return await query.getOne();
  }

  async createOdontogram(
    manager: EntityManager,
    appointment_id: number,
    patient_id: number,
    teeth: ToothDto[],
  ): Promise<void> {
    const newAppointmentOdontogram = await manager
      .getRepository(Odontogram)
      .save({
        patient_id,
        appointment_id,
      });

    await this.toothService.applyTeethModifications(
      manager,
      newAppointmentOdontogram.id,
      teeth,
    );
  }
}
