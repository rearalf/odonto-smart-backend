import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
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
      'The unique name of the permission. Each permission must have a distinct name.',
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    example: 'The CREATE_USER permission grants permissions to create users.',
    description:
      'A detailed description of the permissions, explaining responsibilities within the system.',
  })
  description: string;

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
}
