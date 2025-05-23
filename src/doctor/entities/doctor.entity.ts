import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { DoctorSpecialty } from './doctor-specialty.entity';
import { Person } from 'src/person/entities/person.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Specialty } from './specialty.entity';

@Entity()
export class Doctor extends BaseEntity {
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  @ApiProperty({
    description: 'Person associated with the doctor.',
    type: () => Person,
  })
  person: Person;

  @Column()
  person_id: number;

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

  @Column()
  specialty_id: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'DDS, MSc in Orthodontics',
    description: 'The academic or professional qualification of the doctor.',
  })
  qualification?: string;
}
