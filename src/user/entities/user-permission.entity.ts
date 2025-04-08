import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class UserPermission extends BaseEntity {
  @ManyToOne(() => User, (user) => user.user_permission)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'The user associated with this permission.',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Permission, (permission) => permission.user_permission)
  @JoinColumn({ name: 'permission_id' })
  @ApiProperty({
    description: 'The permission associated with the user.',
    type: () => Permission,
  })
  permission: Permission;
}
