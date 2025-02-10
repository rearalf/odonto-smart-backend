import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { IsDate, IsString } from 'class-validator';
import { GenderEnum } from 'src/db/seeds/seeds';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the patient.',
  })
  id: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ type: 'date' })
  @IsDate()
  @ApiProperty({
    example: 'Wed Feb 05 2025 13:24:13 GMT-0600 (hora estándar central)',
    description: 'Is the birth date of the patient',
  })
  birthDate: Date;

  @Column({ type: 'enum', enum: GenderEnum })
  @ApiProperty({
    enum: GenderEnum,
    example: GenderEnum.MAN,
    description: 'The gender for the patient',
  })
  gender: GenderEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @ApiProperty({
    example: 'The patient is allergic to dye number 3.',
    description: 'Describ the allegic patient.',
  })
  allergies?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @ApiProperty({
    example: 'The patient has never been to the dentist.',
    description: 'Describ the history  patient.',
  })
  medicalHistory?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @ApiProperty({
    example: 'The patient is good.',
    description: 'Describ the current condition when the patient is creating.',
  })
  currentCondition?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the patient was created',
    example: '2025-01-01T12:00:00Z',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the patient was update',
    example: '2025-01-01T12:00:00Z',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the patient was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
