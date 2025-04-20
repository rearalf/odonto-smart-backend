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

import { CreateUserDto } from '@/user/dto/create-user.dto';

export class CreatePersonDto {
  @ApiProperty({ example: 'Carlos' })
  @IsString({ message: 'El nombre debe de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacio.' })
  @Length(1, 100)
  first_name: string;

  @ApiProperty({ example: 'Alberto', required: false })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe de ser una cadena de texto.' })
  @Length(1, 100)
  middle_name?: string;

  @ApiProperty({ example: 'Cruz del Monte' })
  @IsString({ message: 'Los apellidos deben de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Los apellidos no deben estar vacio.' })
  @Length(1, 100)
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
  profile_picture?: string;

  @ApiProperty({
    description: 'User to be created and linked to this Person.',
    type: () => CreateUserDto,
  })
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
