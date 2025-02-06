import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DoctorSpecialty } from 'src/doctor-specialty/entities/doctor-specialty.entity';
import { Person } from 'src/person/entities/person.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the doctor.',
  })
  id: number;

  @OneToOne(() => Person, { cascade: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => DoctorSpecialty, (doctorSpecialty) => doctorSpecialty.doctor)
  @ApiProperty({
    example: 'Ortodoncia',
    description: 'Specialty associated with this doctor',
  })
  specialty: DoctorSpecialty[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the doctor was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the doctor was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the doctor was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
