import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TOOTH_STATE, TOOTH_FACE_AFFECTION } from 'src/common/enums/tooth.enum';

export class ToothDto {
  @ApiProperty({
    description: 'Tooth ID for for assign the odontogram',
    example: 123,
  })
  @IsOptional()
  @IsNumber({}, { message: 'The tooth ID must be a number.' })
  id?: number;

  @ApiProperty({
    description: 'Odontogram ID for for assign the tooth',
    example: 123,
  })
  @IsOptional()
  @IsNumber({}, { message: 'The odontogram ID must be a number.' })
  odontogram_id?: number;

  @ApiProperty({
    description: 'Número del diente según la nomenclatura dental',
    example: 11,
  })
  @IsInt({ message: 'El número de diente debe ser un entero.' })
  @Min(11, { message: 'El número mínimo de diente es 11.' })
  @Max(85, { message: 'El número máximo de diente es 85.' })
  tooth_number: number;

  @ApiPropertyOptional({
    description: 'Estado general del diente',
    enum: TOOTH_STATE,
    example: TOOTH_STATE.HEALTHY,
  })
  @IsOptional()
  @IsEnum(TOOTH_STATE)
  general_state?: TOOTH_STATE;

  @ApiPropertyOptional({
    description: 'Estado de la cara palatina',
    enum: TOOTH_FACE_AFFECTION,
  })
  @IsOptional()
  @IsEnum(TOOTH_FACE_AFFECTION)
  palatina?: TOOTH_FACE_AFFECTION;

  @ApiPropertyOptional({
    description: 'Estado de la cara distal',
    enum: TOOTH_FACE_AFFECTION,
  })
  @IsOptional()
  @IsEnum(TOOTH_FACE_AFFECTION)
  distal?: TOOTH_FACE_AFFECTION;

  @ApiPropertyOptional({
    description: 'Estado de la cara mesial',
    enum: TOOTH_FACE_AFFECTION,
  })
  @IsOptional()
  @IsEnum(TOOTH_FACE_AFFECTION)
  mesial?: TOOTH_FACE_AFFECTION;

  @ApiPropertyOptional({
    description: 'Estado de la cara vestibular',
    enum: TOOTH_FACE_AFFECTION,
  })
  @IsOptional()
  @IsEnum(TOOTH_FACE_AFFECTION)
  vestibular?: TOOTH_FACE_AFFECTION;

  @ApiPropertyOptional({
    description: 'Estado de la cara oclusal',
    enum: TOOTH_FACE_AFFECTION,
  })
  @IsOptional()
  @IsEnum(TOOTH_FACE_AFFECTION)
  oclusal?: TOOTH_FACE_AFFECTION;
}
