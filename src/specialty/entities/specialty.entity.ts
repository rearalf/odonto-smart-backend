import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
    description: 'The name of the specialty.',
    example: 'Ortodoncia',
  })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
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
