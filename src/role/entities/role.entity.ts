import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the role' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'Admin', description: 'Name of the role' })
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Administrator with full access',
    description: 'Detailed description of the role',
  })
  @IsString()
  description: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    eager: true,
  })
  @ApiProperty({
    example: 'VIEW',
    description: 'Permissions associated with this role',
  })
  permission: RolePermission[];

  @OneToMany(() => UserRole, (userRole) => userRole.role, {
    eager: true,
  })
  @ApiProperty({
    example: 'VIEW',
    description: 'Users associated with this role',
  })
  user: UserRole[];

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-14T10:00:00.000Z',
    description: 'Timestamp when the role was created',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    example: '2025-01-15T12:00:00.000Z',
    description: 'Timestamp when the role was last updated',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    example: null,
    description: 'Timestamp when the role was soft-deleted (if applicable)',
  })
  deleted_at?: Date;
}
