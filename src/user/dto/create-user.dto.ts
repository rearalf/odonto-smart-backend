import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsArray,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateUserDto extends CreatePersonDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hashedpassword123',
    description: 'Password of the user (hashed)',
  })
  @MinLength(8)
  @MaxLength(40)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: '1, 2, 3',
    description: 'It is the roles ids',
  })
  @IsArray()
  role: number[];

  @ApiProperty({
    example: '1, 2, 3',
    description: 'It is the permissions ids',
  })
  @IsArray()
  permission: number[];
}
