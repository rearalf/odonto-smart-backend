import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreatePersonDto } from '@/person/dto/create-person.dto';

export class CreateDoctorDto {
  @ApiProperty({
    example:
      'It is a person who graduated from x university, with a specialty in x',
    description: 'The qualification of the doctor',
  })
  @IsOptional()
  @IsString({ message: 'La calificacion debe de ser una cadena de texto.' })
  qualification?: string;

  @ApiProperty({
    example: 1,
    description: 'It is the specific specialty that this doctor has.',
  })
  @IsNumber({}, { message: 'La especialidad no es valida' })
  specialty_id: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the specialties ids',
  })
  @IsOptional()
  @IsArray({ message: 'Las especialidades no son validos.' })
  @IsNumber({}, { each: true, message: 'Las especialidades no son validas.' })
  specialty_ids?: number[];

  @ApiProperty({
    description: 'Person to be created and linked to this doctor.',
    type: () => CreatePersonDto,
  })
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;
}
