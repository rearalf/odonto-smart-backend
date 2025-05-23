import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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

  @OneToMany(() => Tooth, (tooth) => tooth.odontogram)
  tooth: Tooth[];
}
