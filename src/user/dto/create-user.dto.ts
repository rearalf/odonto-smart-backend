import {
  IsEmail,
  IsArray,
  Matches,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  last_name: string;

  @IsArray()
  role: number[];
}
