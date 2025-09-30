import { TOOTH_FACE_AFFECTION, TOOTH_STATE } from '@/common/enums/tooth.enum';
import { ApiProperty } from '@nestjs/swagger';

class ToothSchema {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  odontogram_id: number;

  @ApiProperty({ example: 11 })
  tooth_number: number;

  @ApiProperty({ enum: TOOTH_STATE, example: TOOTH_STATE.HEALTHY })
  general_state: TOOTH_STATE;

  @ApiProperty({
    enum: TOOTH_FACE_AFFECTION,
    example: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  palatina: TOOTH_FACE_AFFECTION;

  @ApiProperty({
    enum: TOOTH_FACE_AFFECTION,
    example: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  distal: TOOTH_FACE_AFFECTION;

  @ApiProperty({
    enum: TOOTH_FACE_AFFECTION,
    example: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  mesial: TOOTH_FACE_AFFECTION;

  @ApiProperty({
    enum: TOOTH_FACE_AFFECTION,
    example: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  vestibular: TOOTH_FACE_AFFECTION;

  @ApiProperty({
    enum: TOOTH_FACE_AFFECTION,
    example: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  oclusal: TOOTH_FACE_AFFECTION;
}

export class OdontogramSchema {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 123 })
  patient_id: number;

  @ApiProperty({ example: 456 })
  appointment_id: number;

  @ApiProperty({ type: () => [ToothSchema] })
  tooth: ToothSchema[];
}
