import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'Unique identifier of the entity',
    example: 1,
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'Date when the record was created',
    example: '2025-04-10T14:48:00.000Z',
    required: false,
  })
  @CreateDateColumn({ type: 'timestamptz', nullable: true, select: false })
  created_at: Date;

  @ApiProperty({
    description: 'Date when the record was last updated',
    example: '2025-04-10T15:00:00.000Z',
    required: false,
  })
  @UpdateDateColumn({ type: 'timestamptz', nullable: true, select: false })
  updated_at: Date;

  @ApiProperty({
    description: 'Date when the record was soft deleted',
    example: '2025-04-11T10:00:00.000Z',
    required: false,
  })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true, select: false })
  deleted_at: Date;
}
