import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUrl,
  Length,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

import { BaseEntity } from 'src/db/entities/base-entity';
import { User } from 'src/user/entities/user.entity';
import { PersonType } from './person_type.entity';
import { PersonContact } from './person_contact.entity';

@Entity()
export class Person extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty({ message: 'First name is required.' })
  @Length(1, 100, {
    message: 'First name must be between 1 and 100 characters.',
  })
  @ApiProperty({
    example: 'Carlos',
    description: 'The first name of the person.',
  })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsString()
  @IsOptional()
  @Length(1, 100, {
    message: 'Middle name, if provided, must be between 1 and 100 characters.',
  })
  @ApiProperty({
    example: 'Alberto',
    description: 'The middle name of the person (optional).',
  })
  middle_name?: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required.' })
  @Length(1, 100, {
    message: 'Last name must be between 1 and 100 characters.',
  })
  @ApiProperty({
    example: 'Cruz del Monte',
    description: 'The last name of the person.',
  })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl(
    {},
    { message: 'Profile picture name must be a valid URL, if provided.' },
  )
  @ApiProperty({
    example: 'profile.jpg',
    description:
      'The file name of the person’s profile picture (optional). If provided, it must be a valid URL.',
  })
  profile_picture_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description:
      'The URL or file name of the person’s profile picture (optional).',
  })
  profile_picture?: string;

  @OneToOne(() => User, (user) => user.person)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'The user associated with this person.',
    example: { email: 'user@example.com', id: 1 },
  })
  user: User;

  @Column()
  user_id: number;

  @OneToOne(() => PersonType, (personType) => personType.person)
  @JoinColumn({ name: 'person_type_id' })
  @ApiProperty({
    description: 'The person type associated with this person.',
    example: { name: 'Doctor', id: 1 },
  })
  person_type: PersonType;

  @Column()
  person_type_id: number;

  @OneToMany(() => PersonContact, (contact) => contact.person, {
    cascade: true,
  })
  @ApiProperty({
    description: 'List of contacts associated with this person.',
    type: () => [PersonContact],
  })
  contacts: PersonContact[];
}
