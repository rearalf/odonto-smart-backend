import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the role permission relationship',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Role, (role) => role.permission)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    description: 'The role associated with this permission',
    type: () => Role,
  })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.role)
  @JoinColumn({ name: 'permission_id' })
  @ApiProperty({
    description: 'The permission associated with this role',
    type: () => Permission,
  })
  permission: Permission;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-14T10:00:00.000Z',
    description: 'Timestamp when the role-permission was created',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-15T12:00:00.000Z',
    description: 'Timestamp when the role-permission was last updated',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: null,
    description: 'Timestamp when the role-permission ',
  })
  deleted_at?: Date;
}
