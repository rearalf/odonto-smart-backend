import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Specialty } from './specialty.entity';
import { Doctor } from './doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  @JoinColumn({ name: 'specialty_id' }) // corrected name
  @ApiProperty({
    description: 'Specialty assigned to the doctor.',
    type: () => Specialty,
  })
  specialty: Specialty;
}
