import { BaseEntity } from 'src/db/entities/base-entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

export class UserRole extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userRole)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description:
      'The user associated with this role. A user can have multiple roles.',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRole)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    description:
      "The role assigned to the user. A role represents the user's permissions and access levels.",
    type: () => Role,
  })
  role: Role;
}
