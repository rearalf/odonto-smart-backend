import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  Max,
  Min,
  IsInt,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Odontogram } from './odontogram.entity';
import {
  TOOTH_STATE,
  VALID_TOOTH_NUMBERS,
  TOOTH_FACE_AFFECTION,
} from 'src/common/enums/tooth.enum';

@ValidatorConstraint({ name: 'IsToothNumberValid', async: false })
export class IsToothNumberValid implements ValidatorConstraintInterface {
  validate(toothNumber: number, _args: ValidationArguments): boolean {
    return VALID_TOOTH_NUMBERS.includes(toothNumber);
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Invalid tooth number. The number must be one of the valid tooth numbers.';
  }
}

@Entity()
export class Tooth extends BaseEntity {
  @ManyToOne(() => Odontogram, (odontogram) => odontogram.tooth, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'odontogram_id' })
  @ApiProperty({
    description: 'The odontogram to which this tooth belongs.',
    type: () => Odontogram,
    required: true,
  })
  odontogram: Odontogram;

  @Column()
  odontogram_id: number;

  @IsInt()
  @Min(11)
  @Max(85)
  @Validate(IsToothNumberValid)
  @Column({ type: 'int' })
  @ApiProperty({
    description: 'The tooth number according to the dental charting.',
    example: 11,
    type: 'number',
  })
  tooth_number: number;

  @Column({
    type: 'enum',
    enum: TOOTH_STATE,
    default: TOOTH_STATE.HEALTHY,
  })
  @ApiProperty({
    example: TOOTH_STATE.HEALTHY,
    description: 'General state of the tooth (e.g., healthy, decayed).',
    type: () => TOOTH_STATE,
  })
  general_state: TOOTH_STATE;

  @Column({
    type: 'enum',
    enum: TOOTH_FACE_AFFECTION,
    default: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  @ApiProperty({
    example: TOOTH_STATE.HEALTHY,
    description: 'Condition of the palatine surface of the tooth.',
    type: () => TOOTH_FACE_AFFECTION,
  })
  palatina: TOOTH_FACE_AFFECTION;

  @Column({
    type: 'enum',
    enum: TOOTH_FACE_AFFECTION,
    default: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  @ApiProperty({
    example: TOOTH_STATE.HEALTHY,
    description: 'Condition of the distal surface of the tooth.',
    type: () => TOOTH_FACE_AFFECTION,
  })
  distal: TOOTH_FACE_AFFECTION;

  @Column({
    type: 'enum',
    enum: TOOTH_FACE_AFFECTION,
    default: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  @ApiProperty({
    example: TOOTH_STATE.HEALTHY,
    description: 'Condition of the mesial surface of the tooth.',
    type: () => TOOTH_FACE_AFFECTION,
  })
  mesial: TOOTH_FACE_AFFECTION;

  @Column({
    type: 'enum',
    enum: TOOTH_FACE_AFFECTION,
    default: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  @ApiProperty({
    example: TOOTH_STATE.HEALTHY,
    description: 'Condition of the vestibular surface of the tooth.',
    type: () => TOOTH_FACE_AFFECTION,
  })
  vestibular: TOOTH_FACE_AFFECTION;

  @Column({
    type: 'enum',
    enum: TOOTH_FACE_AFFECTION,
    default: TOOTH_FACE_AFFECTION.HEALTHY,
  })
  @ApiProperty({
    example: TOOTH_STATE.HEALTHY,
    description: 'Condition of the occlusal surface of the tooth.',
    type: () => TOOTH_FACE_AFFECTION,
  })
  oclusal: TOOTH_FACE_AFFECTION;
}
