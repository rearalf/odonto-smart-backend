import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PersonType } from 'src/person-type/entities/person-type.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the person' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'John', description: 'The first name of the person' })
  @IsString()
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    example: 'Nes',
    description: 'The middle name of the person',
  })
  @IsString()
  middle_name?: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'Quik', description: 'Last name of the person' })
  @IsString()
  last_name: string;

  @OneToOne(() => PersonType)
  @JoinColumn({ name: 'person_type_id' })
  personType: PersonType;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the person was created',
    example: '2025-01-01T12:00:00Z',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the person was update',
    example: '2025-01-01T12:00:00Z',
  })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: 'Date when the person was deleted',
    example: '2025-01-01T12:00:00Z',
  })
  deleted_at: Date;
}
