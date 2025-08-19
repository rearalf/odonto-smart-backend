import { Gender } from '@/common/enums/person.enum';
import { CreatePersonDto } from '@/person/dto/create-person.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePatientDto extends CreatePersonDto {
  @ApiProperty({
    example: '1990-07-15',
    description: 'The birth date of the patient.',
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  birth_date: Date;

  @ApiProperty({
    example: '+50371234567',
    description: 'Contact phone number of the patient.',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'San Salvador, El Salvador',
    description: 'Residential address of the patient.',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'Occupation or professional activity of the patient.',
    required: false,
  })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({
    example: 'Patient has a history of hypertension and diabetes.',
    description: 'Relevant past medical conditions or diseases.',
    required: false,
  })
  @IsOptional()
  @IsString()
  medical_history?: string;

  @ApiProperty({
    example: 'Allergic to penicillin and latex.',
    description: 'Any known allergic reactions.',
    required: false,
  })
  @IsOptional()
  @IsString()
  allergic_reactions?: string;

  @ApiProperty({
    example: 'Currently taking antihypertensive medication.',
    description: 'Ongoing systemic treatments or chronic medication.',
    required: false,
  })
  @IsOptional()
  @IsString()
  current_systemic_treatment?: string;

  @ApiProperty({
    example: 'Lab results indicate elevated glucose levels.',
    description: 'Results or follow-ups from laboratory exams.',
    required: false,
  })
  @IsOptional()
  @IsString()
  lab_results?: string;

  @ApiProperty({
    description:
      'Indicates if temporary teeth (deciduous teeth) should be included in the odontogram.',
    example: true,
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  complete_odontogram?: boolean;

  @ApiProperty({
    enum: Gender,
    example: Gender.FEMALE,
    description: 'The gender of the patient.',
  })
  @IsEnum(Gender)
  gender: Gender;

  // ----------- System Notes 1 -----------
  @ApiProperty({
    example: false,
    required: false,
    description:
      'Indicates if the patient has issues related to the central nervous system (CNS).',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  snc?: boolean;

  @ApiProperty({
    example: false,
    required: false,
    description:
      'Indicates if the patient has cardiovascular system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  svc?: boolean;

  @ApiProperty({
    example: false,
    required: false,
    description: 'Indicates if the patient has endocrine system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  se?: boolean;

  @ApiProperty({
    example: false,
    required: false,
    description:
      'Indicates if the patient has musculoskeletal system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  sme?: boolean;

  @ApiProperty({
    example: 'Notes about systemic condition 1',
    required: false,
    description:
      'Additional notes regarding systemic conditions from the first group (CNS, cardiovascular, endocrine, musculoskeletal).',
  })
  @IsOptional()
  @IsString()
  systemNotes1?: string;

  // ----------- System Notes 2 -----------
  @ApiProperty({
    example: false,
    required: false,
    description: 'Indicates if the patient has respiratory system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  sr?: boolean;

  @ApiProperty({
    example: false,
    required: false,
    description: 'Indicates if the patient has urinary system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  su?: boolean;

  @ApiProperty({
    example: false,
    required: false,
    description:
      'Indicates if the patient has genital or urogenital system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  sgu?: boolean;

  @ApiProperty({
    example: false,
    required: false,
    description:
      'Indicates if the patient has gastrointestinal system conditions.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  sgi?: boolean;

  @ApiProperty({
    example: 'Notes about systemic condition 2',
    required: false,
    description:
      'Additional notes regarding systemic conditions from the second group (respiratory, urinary, genital/urogenital, gastrointestinal).',
  })
  @IsOptional()
  @IsString()
  systemNotes2?: string;
}
