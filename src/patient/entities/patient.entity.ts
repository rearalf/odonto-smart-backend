import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Odontogram } from 'src/odontogram/entities/odontogram.entity';
import { Person } from 'src/person/entities/person.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { MedicalRecord } from './medical_record.entity';

@Entity()
export class Patient extends BaseEntity {
  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  @ApiProperty({
    description: 'The person associated with this patient record.',
    type: () => Person,
  })
  person: Person;

  @Column({ type: 'date' })
  @ApiProperty({
    example: '1990-07-15',
    description: 'The birth date of the patient.',
    type: 'string',
    format: 'date',
  })
  birth_date: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Patient has a history of hypertension and diabetes.',
    description: 'Relevant past medical conditions or diseases.',
    required: false,
  })
  medical_history?: string;
  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Allergic to penicillin and latex.',
    description: 'Any known allergic reactions.',
    required: false,
  })
  allergic_reactions?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Currently taking antihypertensive medication.',
    description: 'Ongoing systemic treatments or chronic medication.',
    required: false,
  })
  current_systematic_treatment?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Referred to lab for blood glucose and CBC analysis.',
    description: 'Any references or follow-ups made to laboratories.',
    required: false,
  })
  lab_references?: string;

  @ApiProperty({
    description:
      'Indicates if temporary teeth (deciduous teeth) should be included in the odontogram.',
    example: true,
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  complete_odontogram: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (record) => record.patient)
  medicalRecords: MedicalRecord[];

  @OneToMany(() => Odontogram, (odontogram) => odontogram.patient)
  odontograms: Odontogram[];
}
