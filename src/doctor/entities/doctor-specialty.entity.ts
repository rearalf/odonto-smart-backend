import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Specialty } from './specialty.entity';
import { Doctor } from './doctor.entity';

@Entity()
export class DoctorSpecialty extends BaseEntity {
  @ManyToOne(() => Doctor, (doctor) => doctor.doctorSpecialty)
  @JoinColumn({ name: 'doctor_id' })
  @ApiProperty({
    description: 'Doctor linked to this secondary specialty.',
    type: () => Doctor,
  })
  doctor: Doctor;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctorSpecialty)
  @JoinColumn({ name: 'specialty_id' })
  @ApiProperty({
    description: 'Specialty assigned to the doctor.',
    type: () => Specialty,
  })
  specialty: Specialty;

  @Column()
  doctor_id: number;

  @Column()
  specialty_id: number;
}
