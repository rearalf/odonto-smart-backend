import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { UserPermission } from 'src/user-permission/entities/user-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the permission',
    example: 1,
  })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'The name of the permission',
    example: 'View Dashboard',
  })
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Detailed description of the permission (optional)',
    example: 'Allows the user to view the dashboard.',
    nullable: true,
  })
  @IsString()
  description: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  @ApiProperty({
    example: 'Admin',
    description: 'Role associated with this permission',
  })
  role: RolePermission[];

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission,
  )
  @ApiProperty({
    example: 'Admin',
    description: 'Users associated with this permission',
  })
  user: UserPermission[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the permission was created',
    example: '2025-01-01T12:00:00Z',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the permission was last updated',
    example: '2025-01-01T12:00:00Z',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    nullable: true,
    description: 'Timestamp when the permission was deleted (if applicable)',
  })
  deletedAt?: Date;
}
