import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    minLength: 2,
    maxLength: 100,
    type: 'string',
    example: 'Carlos',
    description: 'The first name for the person',
  })
  @IsNotEmpty({ message: 'El primer nombre es obligatorio.' })
  @IsString({ message: 'El primer nombre debe ser una cadena de texto.' })
  @Length(2, 100, {
    message:
      'El primer nombre no cumple con el rango de caracteres permitidos.',
  })
  first_name: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 100,
    type: 'string',
    example: 'Carlos',
    description: 'The middle name for the person',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto.' })
  @Length(2, 100, {
    message:
      'El segundo nombre no cumple con el rango de caracteres permitidos.',
  })
  middle_name?: string;

  @ApiProperty({
    minLength: 5,
    maxLength: 255,
    type: 'string',
    example: 'Pérez',
    description: 'The last name for the person',
  })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @IsString({ message: 'Los apellidos deben ser una cadena de texto.' })
  @Length(5, 255, {
    message: 'Los apellidos no cumplen con el rango de caracteres permitidos.',
  })
  last_name: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'The person type id',
  })
  @IsNotEmpty({ message: 'El tipo de persona es obligatorio.' })
  @IsNumber({}, { message: 'El tipo de persona debe ser un número.' })
  @IsPositive({ message: 'El tipo de persona debe ser un valor positivo.' })
  personType: number;

  @ApiProperty({
    nullable: true,
    example: '1, 2, 3',
    description: 'The specialties ids for the person',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Las especialidades deben ser un arreglo de números.' })
  specialty?: number[];
}
