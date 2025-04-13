// src/common/dto/id-name.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class BasicDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the resource (auto-generated)',
    type: Number,
  })
  @IsInt()
  id: string;

  @ApiProperty({
    example: 'Doctor',
    description: 'Name of the resource',
  })
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    example: 'This type of person is assigned appointments and specialties',
    description:
      'A detailed description of the type of person, explaining their responsibilities within the system.',
  })
  @IsString()
  @Length(1, 255)
  description: string;
}

export class IdNameDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the resource (auto-generated)',
    type: Number,
  })
  @IsInt()
  id: string;

  @ApiProperty({
    example: 'Doctor',
    description: 'Name of the resource',
  })
  @IsString()
  @Length(1, 255)
  name: string;
}
