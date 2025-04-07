import { BaseEntity } from 'src/db/entities/base-entity';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role, (role) => role.rolePermission)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    description: 'The role associated with this permission.',
    type: () => Role,
  })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermission)
  @JoinColumn({ name: 'permission_id' })
  @ApiProperty({
    description: 'The permission associated with the role.',
    type: () => Permission,
  })
  permission: Permission;
}
