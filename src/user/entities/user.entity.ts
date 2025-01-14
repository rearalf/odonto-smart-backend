import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Entity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    example: 'hashedpassword123',
    description: 'Password of the user (hashed)',
  })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  last_name: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
