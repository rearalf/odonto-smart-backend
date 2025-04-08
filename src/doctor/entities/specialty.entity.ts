import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { DoctorSpecialty } from './doctor-specialty.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Doctor } from './doctor.entity';

@Entity()
export class Specialty extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  @ApiProperty({
    example: 'Orthodontics',
    description:
      'The unique name of the specialty. Each specialty must have a distinct name.',
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    example:
      'It focuses on correcting misaligned teeth and jaws using devices like braces.',
    description:
      'A detailed description explaining the purpose of the specialty.',
  })
  description: string;

  @OneToMany(() => DoctorSpecialty, (ds) => ds.specialty)
  @ApiProperty({
    description: 'List of doctors associated with this specialty.',
    type: () => [DoctorSpecialty],
  })
  doctorSpecialty: DoctorSpecialty[];

  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  @ApiProperty({
    description: 'List of doctors who have this as their main specialty.',
    type: () => [Doctor],
  })
  doctor: Doctor[];
}
