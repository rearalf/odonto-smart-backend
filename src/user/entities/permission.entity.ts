import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { RolePermission } from './role-permission.entity';
import { UserPermission } from './user-permission.entity';
import { BaseEntity } from 'src/db/entities/base-entity';

@Entity()
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  @ApiProperty({
    example: 'CREATE_USER',
    description:
      'The unique internal name of the permission, used programmatically. Typically uppercase.',
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    example: 'Allows the creation of new users.',
    description:
      'A technical description explaining what the permission allows within the system.',
  })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    example: 'Crear usuario',
    description:
      'User-facing label to display this permission in the UI. Usually in Spanish and properly capitalized.',
  })
  label: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
    { eager: false, cascade: ['soft-remove'] },
  )
  @ApiProperty({
    type: [RolePermission],
    description: 'List of roles that have been assigned this permission.',
    example: [{ roleId: 1, permissionId: 2 }],
  })
  role_permission: RolePermission[];

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission,
    { eager: false, cascade: ['soft-remove'] },
  )
  @ApiProperty({
    type: [UserPermission],
    description: 'List of users that have been assigned this permission.',
    example: [{ userId: 1, permissionId: 2 }],
  })
  user_permission: UserPermission[];

  @ManyToOne(() => Permission, (permission) => permission.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_permission_id' })
  @ApiPropertyOptional({
    type: () => Permission,
    description:
      'Optional parent permission used to group related permissions.',
  })
  parent?: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent)
  @ApiProperty({
    type: () => [Permission],
    description: 'Child permissions grouped under this permission.',
  })
  children: Permission[];
}
