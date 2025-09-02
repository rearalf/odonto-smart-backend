import { plainToInstance, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsEnum,
  IsEmail,
  IsArray,
  Matches,
  IsNumber,
  IsString,
  IsBoolean,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
} from 'class-validator';

import { CreatePersonContactDto } from '@/person/dto/create-person-contact.dto';
import { Gender } from '@/common/enums/person.enum';

export class CreatePatientDto {
  /* Person */
  @ApiProperty({
    example: 'Carlos',
    required: true,
    description: 'First name of the person.',
  })
  @IsString({ message: 'El nombre debe de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacio.' })
  @Length(1, 100, {
    message: 'El nombre debe de tener entre 1 y 100 caracteres.',
  })
  first_name: string;

  @ApiProperty({
    example: 'Alberto',
    required: false,
    description: 'Middle name of the person.',
  })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe de ser una cadena de texto.' })
  @Length(1, 100, {
    message: 'El segundo nombre debe de tener entre 1 y 100 caracteres.',
  })
  middle_name?: string;

  @ApiProperty({
    example: 'Cruz del Monte',
    required: true,
    description: 'Last name of the person.',
  })
  @IsString({ message: 'Los apellidos deben de ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Los apellidos no deben estar vacio.' })
  @Length(1, 100, {
    message: 'Los apellidos debe de tener entre 1 y 100 caracteres.',
  })
  last_name: string;

  @ApiProperty({
    example: 1,
    description:
      'It is the id of the type of person to which it is being assigned.',
  })
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber({}, { message: 'El tipo de persona no es valido.' })
  person_type_id: number;

  @ApiProperty({
    example: 'profile.jpg',
    required: false,
    type: String,
    nullable: true,
    description: 'The name of the profile picture file.',
  })
  @IsOptional()
  @IsString()
  profile_picture_name?: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    required: false,
    description: 'The URL of the profile picture.',
  })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiProperty({
    required: false,
    description:
      'List of User contacts to be created and linked to this Person.',
    type: () => [CreatePersonContactDto],
    example: [
      {
        person_id: 1,
        contact_value: 'carlos@gmail.com',
        contact_type: 'EMAIL',
      },
      {
        person_id: 1,
        contact_value: '+50312345678',
        contact_type: 'PHONE',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Transform(({ value }: { value: string }) =>
    plainToInstance(CreatePersonContactDto, JSON.parse(value)),
  )
  @Type(() => CreatePersonContactDto)
  person_contacts?: CreatePersonContactDto[];

  /* User */
  @ApiProperty({
    required: false,
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email?: string;

  @ApiProperty({
    required: false,
    example: 'Hashedpassword123',
    description: 'Password of the user (hashed)',
  })
  @IsOptional()
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.',
  })
  @MaxLength(40, {
    message: 'La contraseña no debe tener más de 40 caracteres.',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayúsculas, minúsculas y números.',
  })
  password?: string;

  @ApiProperty({
    type: [Number],
    required: false,
    example: [1, 2, 3],
    description: 'It is the roles ids',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    return value.split(',').map(Number);
  })
  @IsArray({ message: 'Los roles no son validos.' })
  @IsNumber({}, { each: true, message: 'Los roles no es valido.' })
  role_ids?: number[];

  /* Patient */
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
