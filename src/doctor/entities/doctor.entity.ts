import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { DoctorSpecialty } from './doctor-specialty.entity';
import { Person } from 'src/person/entities/person.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Specialty } from './specialty.entity';

@Entity()
export class Doctor extends BaseEntity {
  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  @ApiProperty({
    description: 'Person associated with the doctor.',
    type: () => Person,
  })
  person: Person;

  @OneToMany(() => DoctorSpecialty, (ds) => ds.doctor)
  @ApiProperty({
    description: 'List of specialties (secondary) assigned to this doctor.',
    type: () => [DoctorSpecialty],
  })
  doctorSpecialty: DoctorSpecialty[];

  @ManyToOne(() => Specialty, (specialty) => specialty.doctor)
  @JoinColumn({ name: 'specialty_id' })
  @ApiProperty({
    description: 'The main specialty assigned to this doctor.',
    type: () => Specialty,
  })
  specialty: Specialty;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'DDS, MSc in Orthodontics',
    description: 'The academic or professional qualification of the doctor.',
  })
  qualification: string;
}
