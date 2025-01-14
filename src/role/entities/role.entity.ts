import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    example: 'hashed_password',
    description: 'Hashed password of the user',
  })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  last_name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-14T10:00:00.000Z',
    description: 'Timestamp when the user was created',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-15T12:00:00.000Z',
    description: 'Timestamp when the user was last updated',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: null,
    description: 'Timestamp when the user was soft-deleted (if applicable)',
  })
  deleted_at?: Date;
}
