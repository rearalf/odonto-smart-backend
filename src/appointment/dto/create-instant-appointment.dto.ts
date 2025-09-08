import { ToothDto } from '@/odontogram/dto/tooth.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  Length,
  IsArray,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateInstantAppointmentDto {
  @ApiProperty({
    description: 'ID del paciente para quien se programa la cita',
    example: 123,
  })
  @IsNumber({}, { message: 'El ID del paciente debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del paciente es obligatorio.' })
  patient_id: number;

  @ApiPropertyOptional({
    description: 'ID del doctor asignado a la cita (opcional)',
    example: 45,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del doctor debe ser un número.' })
  doctor_id?: number;

  @ApiProperty({
    description: 'Fecha de la cita',
    type: String,
    format: 'date',
    example: '2025-09-07',
  })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de la cita debe ser una fecha válida.' })
  appointment_date: Date;

  @ApiProperty({
    description: 'Motivo de la cita',
    example: 'Consulta de rutina',
  })
  @IsString({ message: 'El motivo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El motivo no debe estar vacío.' })
  @Length(1, 500, {
    message: 'El motivo debe tener entre 1 y 500 caracteres.',
  })
  reason: string;

  @ApiProperty({
    description: 'Notas adicionales relacionadas con la cita',
    example: 'Paciente tiene alergia a la anestesia',
  })
  @IsString({ message: 'Las notas deben ser una cadena de texto.' })
  @IsOptional()
  @Length(0, 500, {
    message: 'Las notas deben tener como máximo 500 caracteres.',
  })
  notes?: string;

  @ApiProperty({
    description: 'Hora de inicio de la cita',
    type: String,
    format: 'date-time',
    example: '2025-09-07T10:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate({ message: 'La hora de inicio debe ser una fecha válida.' })
  start_time: Date;

  @ApiProperty({
    description: 'Hora de finalización de la cita',
    type: String,
    format: 'date-time',
    example: '2025-09-07T10:30:00.000Z',
  })
  @Type(() => Date)
  @IsDate({ message: 'La hora de finalización debe ser una fecha válida.' })
  end_time: Date;

  @ApiProperty({
    description: 'Lista de dientes modificados en esta cita',
    type: [ToothDto],
  })
  @IsArray({ message: 'Debe ser un arreglo de dientes.' })
  @ValidateNested({ each: true })
  @Type(() => ToothDto)
  teeth: ToothDto[];
}
