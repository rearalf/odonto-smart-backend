import {
  Length,
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateDoctorDto {
  /* Person */
  @ApiPropertyOptional({
    example: 'Carlos',
    description: 'First name of the person.',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacio.' })
  @Length(1, 100, {
    message: 'El nombre debe de tener entre 1 y 100 caracteres.',
  })
  first_name?: string;

  @ApiPropertyOptional({
    example: 'Alberto',
    description: 'Middle name of the person.',
  })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe de ser una cadena de texto.' })
  @Length(1, 100, {
    message: 'El segundo nombre debe de tener entre 1 y 100 caracteres.',
  })
  middle_name?: string;

  @ApiPropertyOptional({
    example: 'Cruz del Monte',
    description: 'Last name of the person.',
  })
  @IsOptional()
  @IsString({ message: 'Los apellidos deben de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Los apellidos no deben estar vacio.' })
  @Length(1, 100, {
    message: 'Los apellidos debe de tener entre 1 y 100 caracteres.',
  })
  last_name?: string;

  /* Doctor */
  @ApiPropertyOptional({
    example:
      'It is a person who graduated from x university, with a specialty in x',
    description: 'The qualification of the doctor',
  })
  @IsOptional()
  @IsString({ message: 'La calificación debe de ser una cadena de texto.' })
  qualification?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'It is the specific specialty that this doctor has.',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber({}, { message: 'La especialidad no es válida' })
  specialty_id?: number;

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'It is the specialties ids',
    type: [Number],
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (
      value === 'null' ||
      value === null ||
      value === undefined ||
      value === ''
    )
      return null;
    return JSON.parse(value as string) as Array<number>;
  })
  @ValidateIf((_obj, value) => value !== null)
  @IsArray({ message: 'Las especialidades no son válidas.' })
  @IsNumber({}, { each: true, message: 'Las especialidades no son válidas.' })
  specialty_ids?: number[] | null;
}
