import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Patient } from 'src/patient/entities/patient.entity';
import { Person } from 'src/person/entities/person.entity';
import { AppointmentStatus } from 'src/db/seeds/seeds';

@Entity()
export class Appointment {
  @ApiProperty({
    description: 'Unique identifier for the appointment',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Date and time of the appointment',
    example: '2025-03-10T14:30:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: false })
  date: Date;

  @ApiProperty({
    description: 'Status of the appointment',
    example: AppointmentStatus.SCHEDULED,
    enum: AppointmentStatus,
  })
  @Column({ type: 'enum', enum: AppointmentStatus })
  status: AppointmentStatus;

  @ApiProperty({
    description: 'Additional notes about the appointment',
    example: 'El paciente tiene sensibilidad en la muela superior derecha.',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ApiProperty({
    description: 'Record creation date',
    example: '2025-02-10T12:00:00.000Z',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({
    description: 'Last record update date',
    example: '2025-02-11T12:00:00.000Z',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ApiProperty({
    description: 'Logical deletion date of the record',
    example: null,
    required: false,
  })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ApiProperty({ description: 'ID of the doctor attending the appointment' })
  @ManyToOne(() => Person, (person) => person.id, { nullable: false })
  doctor: Person;

  @ApiProperty({
    description: 'ID of the patient associated with the appointment',
  })
  @ManyToOne(() => Patient, (patient) => patient.id, { nullable: false })
  patient: Patient;
}
