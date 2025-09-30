import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { OdontogramSchema } from '../schemas/odontrogram.schema';
import { Odontogram } from '../entities/odontogram.entity';
import { ToothService } from './tooth.service';
import { ToothDto } from '../dto/tooth.dto';

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
  ): Promise<OdontogramSchema | null> {
    const query = this.odontogramRepository
      .createQueryBuilder('odontogram')
      .leftJoinAndSelect('odontogram.tooth', 'tooth');

    if (type === 'patient') {
      query
        .where('odontogram.patient_id = :id', { id })
        .andWhere('odontogram.appointment_id IS NULL');
    } else if (type === 'appointment') {
      query
        .where('odontogram.appointment_id = :id', { id })
        .andWhere('odontogram.patient_id IS NULL');
    }

    const odontogram = await query.getOne();

    if (!odontogram) return odontogram;

    const {
      created_at,
      updated_at,
      deleted_at,
      patient,
      appointment,
      ...cleanOdontogram
    } = odontogram;

    const clearData = {
      ...cleanOdontogram,
      tooth: odontogram.tooth?.map((t) => {
        const {
          created_at,
          updated_at,
          deleted_at,
          odontogram,
          ...cleanTooth
        } = t;
        return cleanTooth;
      }),
    };

    return clearData;
  }

  async createOdontogram(
    manager: EntityManager,
    appointment_id: number,
    patient_id: number,
    teeth: ToothDto[],
  ): Promise<Odontogram> {
    let generalOdontogram = await manager.getRepository(Odontogram).findOne({
      where: { patient_id, appointment_id: null },
      relations: ['tooth'],
    });

    if (!generalOdontogram) {
      generalOdontogram = await manager.getRepository(Odontogram).save({
        patient_id,
        appointment_id: null,
      });
    }

    const appointmentOdontogram = await manager.getRepository(Odontogram).save({
      patient_id: null,
      appointment_id,
    });

    await this.toothService.applyTeethModifications(
      manager,
      appointmentOdontogram.id,
      generalOdontogram.id,
      teeth,
    );

    return appointmentOdontogram;
  }
}
