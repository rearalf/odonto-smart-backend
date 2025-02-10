import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSpecialty } from './entities/person-specialty.entity';
import { Repository } from 'typeorm';
import { Specialty } from 'src/specialty/entities/specialty.entity';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class PersonSpecialtyService {
  constructor(
    @InjectRepository(PersonSpecialty)
    private readonly personSpecialtyRepository: Repository<PersonSpecialty>,
  ) {}

  async create(specialty: Specialty, person: Person) {
    const validationRelation = await this.findByIdPersonAndSpecialty(
      specialty.id,
      person.id,
    );

    if (validationRelation !== null)
      throw new BadRequestException(
        'Este doctor ya tiene esta especialidad asignada.',
      );

    const created = this.personSpecialtyRepository.create({
      person,
      specialty,
    });

    const saved = await this.personSpecialtyRepository.save(created);

    return saved;
  }

  async findByIdPersonAndSpecialty(specialty_id: number, person_id: number) {
    const relation = this.personSpecialtyRepository
      .createQueryBuilder('person_specialty')
      .where('person_specialty.person_id = :person_id', { person_id })
      .andWhere('person_specialty.specialty_id = :specialty_id', {
        specialty_id,
      })
      .getOne();

    return relation;
  }
}
