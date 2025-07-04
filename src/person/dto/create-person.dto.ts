import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Length,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { CreatePersonContactDto } from './create-person-contact.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';

export class CreatePersonDto {
  @ApiProperty({ example: 'Carlos' })
  @IsString({ message: 'El nombre debe de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacio.' })
  @Length(1, 100, {
    message: 'El nombre debe de tener entre 1 y 100 caracteres.',
  })
  first_name: string;

  @ApiProperty({ example: 'Alberto', required: false })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe de ser una cadena de texto.' })
  @Length(1, 100, {
    message: 'El segundo nombre debe de tener entre 1 y 100 caracteres.',
  })
  middle_name?: string;

  @ApiProperty({ example: 'Cruz del Monte' })
  @IsString({ message: 'Los apellidos deben de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Los apellidos no deben estar vacio.' })
  @Length(1, 100, {
    message: 'Los apellidos debe de tener entre 1 y 100 caracteres.',
  })
  last_name: string;

  @ApiProperty({
    example: 1,
    description:
      'It is the id of the type of person to which it is being assigned.',
  })
  @IsNumber({}, { message: 'El tipo de persona no es valido.' })
  person_type_id: number;

  @ApiProperty({ example: 'profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profile_picture_name?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiProperty({
    description: 'User to be created and linked to this Person.',
    type: () => CreateUserDto,
  })
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ApiProperty({
    description:
      'List of User contacts to be created and linked to this Person.',
    type: () => [CreatePersonContactDto],
    example: [
      {
        person_id: 1,
        contact_value: 'carlos@gmail.com',
        contact_type: 'EMAIL',
      },
      {
        person_id: 1,
        contact_value: '+50312345678',
        contact_type: 'PHONE',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePersonContactDto)
  personContact?: CreatePersonContactDto[];
}
