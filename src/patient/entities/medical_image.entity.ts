import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/db/entities/base-entity';
import { MedicalRecord } from './medical_record.entity';

@Entity()
export class MedicalImage extends BaseEntity {
  @ManyToOne(() => MedicalRecord, (record) => record.medicalImage, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'medical_record_id' })
  @ApiProperty({
    description: 'The medical record this image is associated with.',
    type: () => MedicalRecord,
  })
  medical_record: MedicalRecord;

  @Column()
  @ApiProperty({
    description: 'URL of the uploaded medical image.',
    example: 'https://yourapp.com/uploads/xray-123.png',
  })
  image_url: string;

  @Column()
  @ApiProperty({
    description: 'Original name of the uploaded image file.',
    example: 'xray_april_2025.png',
  })
  original_filename: string;
}
