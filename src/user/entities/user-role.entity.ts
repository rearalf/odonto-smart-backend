import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/db/entities/base-entity';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class UserRole extends BaseEntity {
  @ManyToOne(() => User, (user) => user.user_role)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description:
      'The user associated with this role. A user can have multiple roles.',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.user_role)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    description:
      "The role assigned to the user. A role represents the user's permissions and access levels.",
    type: () => Role,
  })
  role: Role;
}
