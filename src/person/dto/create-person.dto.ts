import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Length } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    minLength: 2,
    maxLength: 100,
    type: 'string',
    example: 'Carlos',
    description: 'The first name for the person',
  })
  @IsString()
  @Length(2, 100, {
    message: 'El nombre no cumple con el rango de caracteres permitidos.',
  })
  first_name: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 100,
    type: 'string',
    example: 'Carlos',
    description: 'The middle name for the person',
  })
  @IsString()
  @Length(2, 100, {
    message:
      'El segundo nombre no cumple con el rango de caracteres permitidos.',
  })
  middle_name?: string;

  @ApiProperty({
    minLength: 5,
    maxLength: 255,
    type: 'string',
    example: 'Carlos',
    description: 'The middle name for the person',
  })
  @IsString()
  @Length(5, 255, {
    message: 'Los apellidos no cumple con el rango de caracteres permitidos.',
  })
  last_name: string;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'The person type id',
  })
  @IsNumber()
  personType: number;

  @ApiProperty({
    nullable: true,
    example: '1, 2, 3',
    description: 'It is the specialties ids for the person',
  })
  @IsArray()
  specialty?: number[];
}
