import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

import { UserRole } from 'src/user-role/entities/user-role.entity';
import { UserPermission } from '../../user-permission/entities/user-permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Length(8, 255)
  @ApiProperty({
    example: 'hashedpassword123',
    description: 'Password of the user (hashed)',
  })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  last_name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  @ApiProperty({
    example: 'Admin',
    description: 'Roles associated with this user',
  })
  rol: UserRole[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  @ApiProperty({
    example: 'Admin',
    description: 'Permissions associated with this user',
  })
  permission: UserPermission[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the permission was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the permission was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the permission was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
