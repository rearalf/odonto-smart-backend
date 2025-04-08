import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role, (role) => role.role_permission)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    description: 'The role associated with this permission.',
    type: () => Role,
  })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.role_permission)
  @JoinColumn({ name: 'permission_id' })
  @ApiProperty({
    description: 'The permission associated with the role.',
    type: () => Permission,
  })
  permission: Permission;
}
