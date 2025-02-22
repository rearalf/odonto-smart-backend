import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSpecialty } from './entities/person-specialty.entity';
import { EntityManager, Repository } from 'typeorm';
import { Specialty } from 'src/specialty/entities/specialty.entity';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class PersonSpecialtyService {
  constructor(
    @InjectRepository(PersonSpecialty)
    private readonly personSpecialtyRepository: Repository<PersonSpecialty>,
  ) {}

  async create(
    specialty: Specialty,
    person: Person,
    entityManager?: EntityManager,
  ) {
    let useEntity: Repository<PersonSpecialty>;
    if (entityManager) useEntity = entityManager.getRepository(PersonSpecialty);
    else useEntity = this.personSpecialtyRepository;

    const validationRelation = await this.findByIdPersonAndSpecialty(
      specialty.id,
      person.id,
    );

    if (validationRelation !== null)
      throw new BadRequestException(
        'Este doctor ya tiene esta especialidad asignada.',
      );

    const created = useEntity.create({
      person,
      specialty,
    });

    const saved = await useEntity.save(created);

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

  async multiDelete(
    userId: number,
    ids: number[],
    entityManager?: EntityManager,
  ) {
    let useEntity: Repository<PersonSpecialty>;
    if (entityManager) useEntity = entityManager.getRepository(PersonSpecialty);
    else useEntity = this.personSpecialtyRepository;

    const deteledPersonSpecialty = await useEntity
      .createQueryBuilder('person_specialty')
      .softDelete()
      .where('person_id = :id', { id: userId })
      .andWhere('specialty_id IN (:...specialties)', { specialties: ids })
      .execute();

    return deteledPersonSpecialty;
  }

  async findMultiPersonSpecialty(person_id: number, specialty_ids: number[]) {
    const personSpecialty = await this.personSpecialtyRepository
      .createQueryBuilder('person_specialty')
      .where('person_specialty.person_id = :person_id', { person_id })
      .andWhere('person_specialty.specialty_id IN (:...specialty_ids)', {
        specialty_ids,
      })
      .getMany();

    return personSpecialty;
  }
}
