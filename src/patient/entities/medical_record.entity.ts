import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { Patient } from './patient.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalImage } from './medical_image.entity';

@Entity()
export class MedicalRecord extends BaseEntity {
  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  @ApiProperty({
    description: 'The patient to whom this medical record belongs.',
    type: () => Patient,
    required: true,
  })
  patient: Patient;

  @ManyToOne(() => Appointment, { nullable: true })
  @JoinColumn({ name: 'appointment_id' })
  @ApiProperty({
    description: 'The appointment related to this record, if applicable.',
    type: () => Appointment,
    required: false,
  })
  appointment?: Appointment;

  @Column({ type: 'text' })
  @ApiProperty({
    example:
      'Patient presented with severe toothache on upper left molar. Prescribed antibiotics and scheduled extraction.',
    description:
      'A detailed description of the patient’s condition, treatment, or diagnosis.',
  })
  description: string;

  @OneToMany(() => MedicalImage, (image) => image.medical_record)
  medicalImage: MedicalImage[];
}
