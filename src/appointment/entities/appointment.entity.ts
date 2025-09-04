import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { STATUS_ENUM } from 'src/common/enums/appointment.enum';

import { MedicalRecord } from 'src/patient/entities/medical_record.entity';
import { Odontogram } from 'src/odontogram/entities/odontogram.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { BaseEntity } from 'src/db/entities/base-entity';

@Entity()
export class Appointment extends BaseEntity {
  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  @ApiProperty({
    description: 'The doctor assigned to the appointment.',
    type: () => Doctor,
  })
  doctor: Doctor;

  @Column()
  doctor_id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  @ApiProperty({
    description: 'The patient attending the appointment.',
    type: () => Patient,
  })
  patient: Patient;

  @Column()
  patient_id: number;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-04-10T09:00:00Z',
    description: 'The full date and time of the appointment.',
  })
  appointment_date: Date;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    example: 'Routine dental cleaning',
    description: 'The reason for the appointment.',
  })
  reason: string;

  @Column({ type: 'enum', enum: STATUS_ENUM, default: STATUS_ENUM.PENDING })
  @ApiProperty({
    example: STATUS_ENUM.PENDING,
    enum: STATUS_ENUM,
    description: 'Current status of the appointment.',
  })
  status: STATUS_ENUM;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'Patient requested extra care due to tooth sensitivity.',
    description: 'Any notes related to the appointment.',
  })
  notes: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-04-10T09:00:00Z',
    description: 'Scheduled start time for the appointment.',
  })
  start_time: Date;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-04-10T09:30:00Z',
    description: 'Scheduled end time for the appointment.',
  })
  end_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    example: '2025-04-09T15:00:00Z',
    description: 'The time at which the appointment was last modified.',
    required: false,
  })
  modified_at?: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Rescheduled due to patient request.',
    description: 'The reason for modifying the appointment.',
    required: false,
  })
  modification_reason?: string;

  @OneToMany(() => MedicalRecord, (record) => record.appointment)
  medicalRecords: MedicalRecord[];

  @OneToOne(() => Odontogram, (odontogram) => odontogram.appointment)
  odontogram: Odontogram;
}
