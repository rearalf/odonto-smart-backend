import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the user-role relationship',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'The user associated with the role',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    description: 'The role associated with the user',
    type: () => Role,
  })
  role: Role;

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
