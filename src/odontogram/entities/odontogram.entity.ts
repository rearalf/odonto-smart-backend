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

  @Column()
  @ApiProperty({
    description: 'The ID of the patient associated with this odontogram.',
    example: 123,
  })
  patient_id: number;

  @OneToOne(() => Appointment, (appointment) => appointment.odontogram, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_id' })
  @ApiProperty({
    description: 'The appointment related to this odontogram.',
    type: () => Appointment,
    required: true,
  })
  appointment: Appointment;

  @Column()
  @ApiProperty({
    description: 'The ID of the appointment associated with this odontogram.',
    example: 456,
  })
  appointment_id: number;

  @OneToMany(() => Tooth, (tooth) => tooth.odontogram, {
    cascade: true,
  })
  @ApiProperty({
    description: 'List of teeth associated with this odontogram.',
    type: () => [Tooth],
  })
  tooth: Tooth[];
}
