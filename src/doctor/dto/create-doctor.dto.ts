import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { CreatePersonDto } from '@/person/dto/create-person.dto';

export class CreateDoctorDto extends CreatePersonDto {
  @ApiProperty({
    example:
      'It is a person who graduated from x university, with a specialty in x',
    description: 'The qualification of the doctor',
  })
  @IsOptional()
  @IsString({ message: 'La calificación debe de ser una cadena de texto.' })
  qualification?: string;

  @ApiProperty({
    example: 1,
    description: 'It is the specific specialty that this doctor has.',
  })
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber({}, { message: 'La especialidad no es válida' })
  specialty_id: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the specialties ids',
  })
  @IsOptional()
  @Transform(
    ({ value }: { value: string }) => JSON.parse(value) as Array<number>,
  )
  @IsArray({ message: 'Las especialidades no son válidas.' })
  @IsNumber({}, { each: true, message: 'Las especialidades no son válidas.' })
  specialty_ids?: number[];
}
