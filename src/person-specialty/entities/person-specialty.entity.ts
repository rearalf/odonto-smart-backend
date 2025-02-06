import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Specialty } from 'src/specialty/entities/specialty.entity';
import { Person } from 'src/person/entities/person.entity';

@Entity('person_specialty')
export class PersonSpecialty {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the doctor specialty relationship',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Person, (person) => person.specialty)
  @JoinColumn({ name: 'person_id' })
  @ApiProperty({
    description: 'The person associated with this specialty',
    type: () => Person,
  })
  person: Person;

  @ManyToOne(() => Specialty, (specialty) => specialty.person)
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
