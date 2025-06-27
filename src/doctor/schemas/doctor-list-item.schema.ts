import { ApiProperty } from '@nestjs/swagger';

class SpecialtySchema {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Periodontics' })
  name: string;

  @ApiProperty({ example: 'Gum disease treatment' })
  description: string;
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
