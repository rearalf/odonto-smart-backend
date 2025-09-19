import { Gender } from '@/common/enums/person.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetPatientByIdSchema {
  @ApiProperty({ example: 1, description: 'Unique identifier for the patient' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the patient' })
  fullName: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone number of the patient',
  })
  phone: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birth date of the patient in YYYY-MM-DD format',
    type: String,
  })
  birth_date: Date;

  @ApiProperty({ example: 31, description: 'Age of the patient in years' })
  age: number;

  @ApiProperty({
    example: '123 Main St, Springfield',
    description: 'Home address of the patient',
  })
  address: string;

  @ApiProperty({
    example: 'Penicillin allergy',
    description: 'Known allergic reactions of the patient',
  })
  allergic_reactions: string;

  @ApiProperty({
    example: 'Diabetes Type II, hypertension',
    description: 'Medical history summary of the patient',
  })
  medical_history: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the patient has a complete odontogram',
  })
  complete_odontogram: boolean;

  @ApiProperty({
    example: 'Insulin therapy',
    description: 'Current systemic treatments the patient is undergoing',
  })
  current_systemic_treatment: string;

  @ApiProperty({
    example: Gender.MALE,
    description: 'Gender of the patient',
    enum: Gender,
  })
  gender: Gender;

  @ApiProperty({
    example: 'Blood test results pending',
    description: 'Relevant lab results for the patient',
  })
  lab_results: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'Occupation of the patient',
  })
  occupation: string;

  @ApiProperty({
    example: false,
    description: 'System check SE flag (custom clinic-specific flag)',
  })
  se: boolean;

  @ApiProperty({
    example: false,
    description: 'System check SGI flag',
  })
  sgi: boolean;

  @ApiProperty({
    example: true,
    description: 'System check SGU flag',
  })
  sgu: boolean;

  @ApiProperty({
    example: false,
    description: 'System check SR flag',
  })
  sr: boolean;

  @ApiProperty({
    example: true,
    description: 'System check SME flag',
  })
  sme: boolean;

  @ApiProperty({
    example: false,
    description: 'System check SNC flag',
  })
  snc: boolean;

  @ApiProperty({
    example: false,
    description: 'System check SU flag',
  })
  su: boolean;

  @ApiProperty({
    example: true,
    description: 'System check SVC flag',
  })
  svc: boolean;

  @ApiProperty({
    example: 'Patient shows improvement on systemic evaluation',
    description: 'Additional notes about the patient’s systemic evaluation',
  })
  systemNotes1: string;

  @ApiProperty({
    example: 'Follow-up scheduled for next month',
    description: 'Additional notes about follow-up or recommendations',
  })
  systemNotes2: string;
}

export class PatientListItemSchema {
  @ApiProperty({ example: 1, description: 'Unique identifier for the patient' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the patient' })
  fullName: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone number of the patient',
  })
  phone: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birth date of the patient',
  })
  birth_date: Date;

  @ApiProperty({ example: 31, description: 'Age of the patient' })
  age: number;
}
