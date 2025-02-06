import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Specialty } from 'src/specialty/entities/specialty.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('doctor_specialty')
export class DoctorSpecialty {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the doctor specialty relationship',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.specialty)
  @JoinColumn({ name: 'doctor_id' })
  @ApiProperty({
    description: 'The doctor associated with this specialty',
    type: () => Doctor,
  })
  doctor: Doctor;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctor)
  @JoinColumn({ name: 'specialty_id' })
  @ApiProperty({
    description: 'The specialty associated with this doctor',
    type: () => Specialty,
  })
  specialty: Specialty;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-14T10:00:00.000Z',
    description: 'Timestamp when the doctor-specialty was created',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-15T12:00:00.000Z',
    description: 'Timestamp when the doctor-specialty was last updated',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: null,
    description: 'Timestamp when the doctor-specialty ',
  })
  deleted_at?: Date;
}
