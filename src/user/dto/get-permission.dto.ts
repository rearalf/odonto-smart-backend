import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class GetAllPermissionDTO {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the resource (auto-generated)',
    type: Number,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Name',
    description: 'Name of the permission',
  })
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    example: 'Label',
    description: 'Label of the permission',
  })
  @IsString()
  @Length(1, 255)
  label: string;
}

export class GetOnePermission extends GetAllPermissionDTO {
  @ApiProperty({
    example: 'This is a description about the name.',
    description:
      'A detailed description of the type of person, explaining their responsibilities within the system.',
  })
  @IsString()
  @Length(1, 255)
  description: string;
}
