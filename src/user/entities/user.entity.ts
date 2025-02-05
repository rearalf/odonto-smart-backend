import {
  Column,
  Entity,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

import { UserRole } from 'src/user-role/entities/user-role.entity';
import { UserPermission } from '../../user-permission/entities/user-permission.entity';
import { UserSession } from 'src/auth/entities/user-session.entity';
import { Person } from 'src/person/entities/person.entity';

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

  @OneToOne(() => Person, { cascade: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { eager: true })
  @ApiProperty({
    example: 'Admin',
    description: 'Roles associated with this user',
  })
  role: UserRole[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  @ApiProperty({
    example: 'create_user',
    description: 'Permissions associated with this user',
  })
  permission: UserPermission[];

  @OneToMany(() => UserSession, (session) => session.user)
  @ApiProperty({
    description: 'Sessions associated with this user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  sessions: UserSession[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the user was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the user was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.hashPassword();
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    if (this.email) this.email = this.email.toLocaleLowerCase().trim();
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
