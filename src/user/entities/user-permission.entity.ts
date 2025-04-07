import { BaseEntity } from 'src/db/entities/base-entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserPermission extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userPermission)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'The user associated with this permission.',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Permission, (permission) => permission.userPermission)
  @JoinColumn({ name: 'permission_id' })
  @ApiProperty({
    description: 'The permission associated with the user.',
    type: () => Permission,
  })
  permission: Permission;
}
