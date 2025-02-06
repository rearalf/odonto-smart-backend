import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateSpecialtyDto {
  @ApiProperty({
    minLength: 5,
    maxLength: 100,
    type: 'string',
    example: 'Periodontics',
    description: 'The name for the specialty',
  })
  @IsString()
  @Length(5, 100, {
    message: 'No cumple con el rango de caracteres permitidos.',
  })
  name: string;

  @ApiProperty({
    minLength: 10,
    maxLength: 100,
    type: 'string',
    description: 'It is the description to the specialty',
    example:
      'Treats diseases of the gums and other tissues that support the teeth, such as gingivitis and periodontitis.',
  })
  @IsString()
  @Length(10, 255, {
    message: 'No cumple con el rango de caracteres permitidos.',
  })
  description: string;
}
