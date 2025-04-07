import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  @ApiProperty({
    example: 'Admin',
    description:
      'The unique name of the role. Each role must have a distinct name.',
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    example:
      'The admin role has all permissions and is the highest level of access.',
    description:
      'A detailed description of the role, explaining its permissions and responsibilities within the system.',
  })
  description: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role, {
    eager: false,
    cascade: ['soft-remove'],
  })
  @ApiProperty({
    type: [UserRole],
    description:
      'List of user-role associations. A role can be assigned to multiple users.',
    example: [{ userId: 1, roleId: 2 }],
  })
  userRole: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    eager: false,
    cascade: ['soft-remove'],
  })
  @ApiProperty({
    type: [RolePermission],
    description: 'List of permissions assigned to the role.',
    example: [{ permissionId: 1, roleId: 2 }],
  })
  rolePermission: RolePermission[];
}
