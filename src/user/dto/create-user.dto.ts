import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  Matches,
  IsEmail,
  IsNumber,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Hashedpassword123',
    description: 'Password of the user (hashed)',
  })
  @MinLength(8)
  @MaxLength(40)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayúsculas, minúsculas y números.',
  })
  password: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the roles ids',
  })
  @IsArray({ message: 'Los roles no son validos.' })
  @IsNumber({}, { each: true, message: 'Los roles no es valido.' })
  role_ids: number[];

  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the permissions ids',
  })
  @IsArray({ message: 'Los permisos no son validos.' })
  @IsNumber({}, { each: true, message: 'El permiso no es valido.' })
  @IsOptional()
  permission_ids?: number[];
}
