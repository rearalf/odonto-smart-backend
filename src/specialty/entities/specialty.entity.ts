import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PersonSpecialty } from 'src/person-specialty/entities/person-specialty.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the specialty.',
  })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    minLength: 5,
    maxLength: 100,
    type: 'string',
    example: 'Ortodoncia',
    description: 'The name of the specialty.',
  })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    minLength: 10,
    maxLength: 100,
    type: 'string',
    description: 'It is the description about the specialty.',
    example:
      'Se enfoca en la corrección de los dientes y mandíbulas desalineadas, utilizando aparatos como frenillos, alineadores y otros dispositivos.',
  })
  @IsString()
  description: string;

  @OneToMany(
    () => PersonSpecialty,
    (personSpecialty) => personSpecialty.specialty,
  )
  @ApiProperty({
    example: 1,
    description: 'Doctor associated with this specialty',
  })
  person: PersonSpecialty[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the specialty was created',
    example: '2025-01-01T12:00:00Z',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the specialty was update',
    example: '2025-01-01T12:00:00Z',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the specialty was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
