import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Column, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { UserPermission } from './user-permission.entity';

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
  rolePermission: RolePermission[];

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
  userPermission: UserPermission[];
}
