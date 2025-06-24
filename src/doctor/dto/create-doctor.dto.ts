import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
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

  @ApiProperty({
    description: 'Person to be created and linked to this doctor.',
    type: () => CreatePersonDto,
  })
  @Transform(({ value }: { value: string }) =>
    plainToInstance(CreatePersonDto, JSON.parse(value) as CreatePersonDto),
  )
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;
}
