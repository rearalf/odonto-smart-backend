import { ApiProperty } from '@nestjs/swagger';

class SpecialtySchema {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Periodontics' })
  name: string;

  @ApiProperty({ example: 'Gum disease treatment' })
  description: string;
}
class PermissionSchema extends SpecialtySchema {
  @ApiProperty({ example: 'Gum disease treatment' })
  label: string;
}

export class DoctorListItemSchema {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ type: () => SpecialtySchema })
  specialty: SpecialtySchema;

  @ApiProperty({ type: () => [SpecialtySchema] })
  secondary_specialties: SpecialtySchema[];

  @ApiProperty({
    example: 'Graduated from X University with a specialty in Orthodontics.',
  })
  qualification: string;

  @ApiProperty({
    example: 'https://example.com/images/profile.jpg',
  })
  profile_picture: string;

  @ApiProperty({ example: 'Dr. John Smith' })
  full_name: string;

  @ApiProperty({ example: 'john.smith@example.com' })
  email: string;
}

export class DoctorItemSchema {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Expert in dental surgery', nullable: true })
  qualification: string | null;

  @ApiProperty({ type: SpecialtySchema })
  specialty: SpecialtySchema;

  @ApiProperty({ type: [SpecialtySchema] })
  specialties: SpecialtySchema[];

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'A.' })
  middle_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'Dr. John Smith' })
  full_name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ type: [SpecialtySchema] })
  roles: SpecialtySchema[];

  @ApiProperty({ type: [SpecialtySchema] })
  permissions: PermissionSchema[];
}
