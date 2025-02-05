import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ContactTypeEnum } from 'src/db/seeds/seeds';
import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PersonContact {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the person contact.',
  })
  id: number;

  @OneToOne(() => Person, { cascade: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({
    type: 'enum',
    enum: ContactTypeEnum,
  })
  @ApiProperty({
    enum: ContactTypeEnum,
    description: 'It is type of the contact.',
    example: ContactTypeEnum.CEL,
  })
  type: ContactTypeEnum;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @ApiProperty({
    description: 'It is the contact.',
    example: '7040-1050',
  })
  @IsString()
  contact: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the contact was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the contact was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the contact was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
