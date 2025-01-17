import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the user-permission relationship',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Permission, (permission) => permission.user)
  @JoinColumn({ name: 'permission_id' })
  @ApiProperty({
    description: 'The permission associated with this user',
    type: () => Permission,
  })
  permission: Permission;

  @ManyToOne(() => User, (user) => user.permission)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'The user associated with this permission',
    type: () => Permission,
  })
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-14T10:00:00.000Z',
    description: 'Timestamp when the user-permission was created',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-15T12:00:00.000Z',
    description: 'Timestamp when the user-permission was last updated',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: null,
    description: 'Timestamp when the user-permission ',
  })
  deleted_at?: Date;
}
