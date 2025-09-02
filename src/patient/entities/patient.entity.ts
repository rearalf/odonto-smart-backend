import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Odontogram } from 'src/odontogram/entities/odontogram.entity';
import { Person } from 'src/person/entities/person.entity';
import { BaseEntity } from 'src/db/entities/base-entity';
import { MedicalRecord } from './medical_record.entity';
import { Gender } from '@/common/enums/person.enum';

@Entity()
export class Patient extends BaseEntity {
  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  @ApiProperty({
    description: 'The person associated with this patient record.',
    type: () => Person,
  })
  person: Person;

  @Column()
  person_id: number;

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
  current_systemic_treatment?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Lab results indicate elevated glucose levels.',
    description: 'Results or follow-ups from laboratory exams.',
    required: false,
  })
  lab_results?: string;

  @ApiProperty({
    description:
      'Indicates if temporary teeth (deciduous teeth) should be included in the odontogram.',
    example: true,
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  complete_odontogram: boolean;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  @ApiProperty({
    enum: Gender,
    example: Gender.FEMALE,
    description: 'The gender of the patient.',
  })
  gender: Gender;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: '+50371234567',
    description: 'Contact phone number of the patient.',
    required: false,
  })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'San Salvador, El Salvador',
    description: 'Residential address of the patient.',
    required: false,
  })
  address?: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'Software Engineer',
    description: 'Occupation or professional activity of the patient.',
    required: false,
  })
  occupation?: string;

  @Column({ type: 'boolean', default: false })
  snc: boolean;

  @Column({ type: 'boolean', default: false })
  svc: boolean;

  @Column({ type: 'boolean', default: false })
  se: boolean;

  @Column({ type: 'boolean', default: false })
  sme: boolean;

  @Column({ type: 'varchar', nullable: true })
  systemNotes1?: string;

  @Column({ type: 'boolean', default: false })
  sr: boolean;

  @Column({ type: 'boolean', default: false })
  su: boolean;

  @Column({ type: 'boolean', default: false })
  sgu: boolean;

  @Column({ type: 'boolean', default: false })
  sgi: boolean;

  @Column({ type: 'varchar', nullable: true })
  systemNotes2?: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (record) => record.patient)
  medicalRecords: MedicalRecord[];

  @OneToMany(() => Odontogram, (odontogram) => odontogram.patient)
  odontograms: Odontogram[];
}
