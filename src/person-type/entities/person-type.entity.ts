import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PersonType {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the type of person',
  })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({
    example: 'Doctor',
    description: 'The name of the type of person',
  })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    example: 'The doctor is in charge of caring for the patient',
    description: 'The description of the type of person',
  })
  @IsString()
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the user was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the user was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
