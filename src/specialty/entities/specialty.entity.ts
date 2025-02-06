import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the specialty was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the specialty was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the specialty was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
