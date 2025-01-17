import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin', description: 'The name for the role' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This role has full control',
    description: 'It is the description to the role',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '1, 2, 3',
    description: 'It is the permissions ids',
  })
  @IsArray()
  permission: number[];
}
