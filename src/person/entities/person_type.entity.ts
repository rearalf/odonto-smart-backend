import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BaseEntity } from 'src/db/entities/base-entity';
import { Person } from './person.entity';

@Entity()
export class PersonType extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  @ApiProperty({
    example: 'Doctor',
    description:
      'The name of the type of person. Each person type must have a distinct name.',
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @ApiProperty({
    example: 'This type of person is assigned appointments and specialties.',
    description:
      'A detailed description of the type of person, explaining their responsibilities within the system.',
  })
  description: string;

  @OneToMany(() => Person, (person) => person.person_type)
  @ApiProperty({
    type: [Person],
    description: 'List of people associated with this person type.',
    example: [
      {
        first_name: 'Carlos',
        last_name: 'Cruz',
        person_type: { name: 'Doctor' },
      },
    ],
  })
  people: Person[];
}
