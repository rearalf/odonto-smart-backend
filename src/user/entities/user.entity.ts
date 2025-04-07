import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Index, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/db/entities/base-entity';
import { UserRole } from './user-role.entity';
import { UserPermission } from './user-permission.entity';

@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description:
      'Email address of the user. Must be unique and a valid email format.',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Length(8, 32)
  @ApiProperty({
    example: 'hashedpassword123',
    description:
      'The hashed password of the user. It must be between 8 and 32 characters long for security purposes.',
  })
  password: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    eager: false,
    cascade: ['soft-remove'],
  })
  @ApiProperty({
    type: [UserRole],
    description:
      'List of roles assigned to the user. A user can have multiple roles.',
    example: [{ role: 'Admin' }, { role: 'User' }],
  })
  userRole: UserRole[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user, {
    eager: false,
    cascade: ['soft-remove'],
  })
  @ApiProperty({
    type: [UserPermission],
    description: 'List of permissions assigned to the user.',
    example: [{ permissionId: 1, userId: 2 }],
  })
  userPermission: UserPermission[];
}
