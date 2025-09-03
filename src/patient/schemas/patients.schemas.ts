import { ApiProperty } from '@nestjs/swagger';

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
