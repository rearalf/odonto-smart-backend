import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Tooth } from './tooth.entity';

@Entity()
export class Odontogram extends BaseEntity {
  @ManyToOne(() => Patient, (patient) => patient.odontograms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  @ApiProperty({
    description: 'The patient to whom this odontogram belongs.',
    type: () => Patient,
    required: true,
  })
  patient: Patient;

  @Column({ nullable: true })
  patient_id: number;

  @OneToOne(() => Appointment, (appointment) => appointment.odontogram, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'appointment_id' })
  @ApiProperty({
    description: 'The appointment related to this odontogram.',
    type: () => Appointment,
    required: true,
  })
  appointment: Appointment;

  @Column({ nullable: true })
  appointment_id: number | null;

  @OneToMany(() => Tooth, (tooth) => tooth.odontogram)
  tooth: Tooth[];
}
