import {
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  ValidateNested,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { CreatePersonContactDto } from '@/person/dto/create-person-contact.dto';

export class CreateDoctorDto {
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
  @Transform(({ value }: { value: string | CreatePersonContactDto[] }) => {
    if (Array.isArray(value)) {
      return value; // Ya es un array, lo devolvemos tal como está
    }
    if (typeof value === 'string') {
      return plainToInstance(CreatePersonContactDto, JSON.parse(value)); // Es string, parseamos
    }
    return value;
  })
  @Type(() => CreatePersonContactDto)
  person_contacts?: CreatePersonContactDto[];

  /* User */
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
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
  password: string;

  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
    description: 'It is the roles ids',
  })
  @IsOptional()
  @Transform(({ value }: { value: string | number[] }) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return value.split(',').map(Number);
    }
    return value;
  })
  @IsArray({ message: 'Los roles no son validos.' })
  @IsNumber({}, { each: true, message: 'Los roles no es valido.' })
  role_ids: number[];

  @ApiProperty({
    example: [1, 2, 3],
    description: 'It is the permissions ids',
    type: [Number],
    required: false,
  })
  @Transform(({ value }: { value: string | number[] }) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return value.split(',').map(Number);
    }
    return value;
  })
  @IsOptional()
  @IsArray({ message: 'Los permisos no son validos.' })
  @IsNumber({}, { each: true, message: 'El permiso no es valido.' })
  permission_ids?: number[];

  /* Doctor */
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
  @Transform(({ value }: { value: string | number[] }) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return value.split(',').map(Number);
    }
    return value;
  })
  @IsArray({ message: 'Las especialidades no son válidas.' })
  @IsNumber({}, { each: true, message: 'Las especialidades no son válidas.' })
  specialty_ids?: number[];
}
