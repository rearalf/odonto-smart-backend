import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreatePersonDto) {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the roles ids',
    required: false,
  })
  @IsArray()
  @IsOptional()
  role?: number[];

  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the permissions ids',
    required: false,
  })
  @IsArray()
  @IsOptional()
  permission?: number[];
}
