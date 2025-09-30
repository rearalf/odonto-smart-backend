import { STATUS_ENUM } from '@/common/enums/appointment.enum';
import { Gender } from '@/common/enums/person.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentsList {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the appointment.',
  })
  id: number;

  @ApiProperty({
    example: '2025-09-30T09:00:00Z',
    description: 'The date and time when the appointment is scheduled.',
  })
  appointment_date: Date;

  @ApiProperty({
    example: STATUS_ENUM.CONFIRMED,
    enum: STATUS_ENUM,
    description: 'The current status of the appointment.',
  })
  status: STATUS_ENUM;

  @ApiProperty({
    example: '2025-09-30T09:00:00Z',
    description: 'Scheduled start time of the appointment.',
  })
  start_time: Date;

  @ApiProperty({
    example: '2025-09-30T09:30:00Z',
    description: 'Scheduled end time of the appointment.',
  })
  end_time: Date;

  @ApiProperty({
    example: 42,
    description:
      'Unique identifier of the patient assigned to the appointment.',
  })
  patient_id: number;

  @ApiProperty({
    example: '1990-07-15',
    description: 'The birth date of the patient.',
  })
  birth_date: Date;

  @ApiProperty({
    example: Gender.FEMALE,
    enum: Gender,
    description: 'The gender of the patient.',
  })
  gender: Gender;

  @ApiProperty({
    example: 'Jane Marie Doe',
    description:
      'The full name of the patient, combining first, middle, and last names.',
  })
  full_name: string;
}
