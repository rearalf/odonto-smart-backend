import { CONTACT_TYPE_ENUM } from 'src/common/enums/person-contact.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Person } from './person.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

@Entity()
export class PersonContact extends BaseEntity {
  @ManyToOne(() => Person, (person) => person.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  @ApiProperty({
    description: 'The person this contact belongs to.',
    type: () => Person,
  })
  person: Person;

  @Column({
    type: 'int',
    nullable: false,
  })
  person_id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty({ message: 'Contact value is required.' })
  @Length(1, 255, {
    message: 'Contact value must be between 1 and 255 characters.',
  })
  @ApiProperty({
    example: 'carlos@gmail.com',
    description: 'The value of the contact (e.g. phone number or email).',
  })
  contact_value: string;

  @Column({ type: 'enum', enum: CONTACT_TYPE_ENUM })
  @IsEnum(CONTACT_TYPE_ENUM, {
    message: `Contact type must be one of: ${Object.values(CONTACT_TYPE_ENUM).join(', ')}`,
  })
  @ApiProperty({
    example: CONTACT_TYPE_ENUM.EMAIL,
    enum: CONTACT_TYPE_ENUM,
    description: 'The type of contact (e.g. EMAIL, PHONE, etc.).',
  })
  contact_type: CONTACT_TYPE_ENUM;
}
