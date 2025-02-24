import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PersonSpecialtyService } from '../person-specialty/person-specialty.service';
import { PersonTypeService } from 'src/person-type/person-type.service';
import { SpecialtyService } from '../specialty/specialty.service';

import { PersonType } from 'src/person-type/entities/person-type.entity';
import { Specialty } from 'src/specialty/entities/specialty.entity';
import { Person } from './entities/person.entity';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly personSpecialtyService: PersonSpecialtyService,
    private readonly personTypeService: PersonTypeService,
    private readonly specialtyService: SpecialtyService,
  ) {}

  async create(
    createPersonDto: CreatePersonDto,
    entityManager?: EntityManager,
  ) {
    let useEntity: Repository<Person>;
    if (entityManager) useEntity = entityManager.getRepository(Person);
    else useEntity = this.personRepository;

    const personType = await this.personTypeService.findOneById(
      createPersonDto.person_type,
    );

    if (!personType)
      throw new NotFoundException('Tipo de persona no encontrado.');

    const createdPerson = useEntity.create({
      first_name: createPersonDto.first_name,
      last_name: createPersonDto.last_name,
      middle_name: createPersonDto.middle_name,
      personType,
    });

    const savedPerson = await useEntity.save(createdPerson);

    const specialties: Specialty[] = [];

    if (personType.name === 'Doctor') {
      if (!createPersonDto.specialty)
        throw new BadRequestException(
          'Si es doctor deberia tener una especialidad.',
        );

      const specialtiesFilter = [...new Set(createPersonDto.specialty)];

      for (const specialtyId of specialtiesFilter) {
        const specialty = await this.specialtyService.findOneById(specialtyId);

        const savedSpecialty = await this.personSpecialtyService.create(
          specialty,
          createdPerson,
          entityManager,
        );

        specialties.push(savedSpecialty.specialty);
      }
    }

    return {
      person: {
        ...savedPerson,
        specialties,
      },
    };
  }

  findAll() {
    return `This action returns all person`;
  }

  async findOne(id: number) {
    const person = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.personType', 'person_type')
      .leftJoinAndSelect('person.specialty', 'personSpecialty')
      .leftJoinAndSelect('personSpecialty.specialty', 'specialty')
      .select([
        'person.id',
        'person.first_name',
        'person.middle_name',
        'person.last_name',
      ])
      .addSelect([
        'person_type.id',
        'person_type.name',
        'person_type.description',
      ])
      .addSelect([
        'personSpecialty.id',
        'specialty.id',
        'specialty.name',
        'specialty.description',
      ])
      .where('person.id = :id', { id })
      .getOne();

    if (!person) throw new NotFoundException(`Persona no encontrada.`);

    const formatSpecialty = person.specialty.map((s) => ({
      id: s.specialty.id,
      name: s.specialty.name,
      description: s.specialty.description,
    }));

    return { ...person, ...formatSpecialty };
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
    entityManager?: EntityManager,
  ) {
    let useEntity: Repository<Person>;
    if (entityManager) useEntity = entityManager.getRepository(Person);
    else useEntity = this.personRepository;

    const person = await this.findOne(id);

    const fieldsToPersonUpdate: UpdatePersonDto & { personType?: PersonType } =
      {};

    if (
      updatePersonDto.first_name &&
      updatePersonDto.first_name !== person.first_name
    ) {
      fieldsToPersonUpdate.first_name = updatePersonDto.first_name;
    }
    if (
      updatePersonDto.middle_name &&
      updatePersonDto.middle_name !== person.middle_name
    ) {
      fieldsToPersonUpdate.middle_name = updatePersonDto.middle_name;
    }
    if (
      updatePersonDto.last_name &&
      updatePersonDto.last_name !== person.last_name
    ) {
      fieldsToPersonUpdate.last_name = updatePersonDto.last_name;
    }

    let personType: PersonType;
    if (updatePersonDto.person_type) {
      personType = await this.personTypeService.findOneById(
        updatePersonDto.person_type,
      );

      fieldsToPersonUpdate.personType = personType;
    }

    if (Object.keys(fieldsToPersonUpdate).length > 0) {
      await useEntity
        .createQueryBuilder('person')
        .update(Person)
        .set({
          first_name: fieldsToPersonUpdate.first_name,
          middle_name: fieldsToPersonUpdate.middle_name,
          last_name: fieldsToPersonUpdate.last_name,
          personType: fieldsToPersonUpdate.personType,
        })
        .where('id = :id', { id: person.id })
        .returning(['id', 'first_name', 'middle_name', 'last_name'])
        .execute();
    }

    const specialtiesModified = {
      added: [] as Specialty[],
      removed: [] as Specialty[],
    };

    if (updatePersonDto.person_type === 4 && personType.name === 'Doctor') {
      if (person.specialty.length === 0 && !updatePersonDto.specialty)
        throw new BadRequestException('El doctor debe tener especialidad.');

      const currentSpecialtiesIds = person.specialty.map(
        (personSpecialty) => personSpecialty.specialty.id,
      );

      const specialtiesToAdd = [...new Set(updatePersonDto.specialty)].filter(
        (id) => !currentSpecialtiesIds.includes(id),
      );

      const specialtiesToRemove = [...new Set(currentSpecialtiesIds)].filter(
        (id) => !updatePersonDto.specialty.includes(id),
      );

      for (const specialtiesId of specialtiesToAdd) {
        const specialty =
          await this.specialtyService.findOneById(specialtiesId);

        const createdPersonSpecialty = await this.personSpecialtyService.create(
          specialty,
          person,
          entityManager,
        );

        specialtiesModified.added.push(createdPersonSpecialty.specialty);
      }

      if (specialtiesToRemove.length > 0) {
        const personSpecialtyToRemovedEntities =
          await this.personSpecialtyService.findMultiPersonSpecialty(
            person.id,
            specialtiesToRemove,
          );

        if (personSpecialtyToRemovedEntities.length > 0) {
          specialtiesModified.removed = personSpecialtyToRemovedEntities.map(
            (specialty) => specialty.specialty,
          );

          await this.personSpecialtyService.multiDelete(
            person.id,
            specialtiesToRemove,
            entityManager,
          );
        }
      }
    }

    const updatedPerson = await this.findOne(id);

    return updatedPerson;
  }

  async remove(id: number, entityManager?: EntityManager) {
    let useEntity: Repository<Person>;
    if (entityManager) useEntity = entityManager.getRepository(Person);
    else useEntity = this.personRepository;

    const person = await this.findOne(id);

    const deletedPerson = await useEntity
      .createQueryBuilder('person')
      .softDelete()
      .where('id = :id', { id: person.id })
      .andWhere('deleted_at IS NULL')
      .returning(['id', 'first_name', 'middle_name', 'last_name', 'personType'])
      .execute();

    let deletedPersonSPecialty = {};

    if (person.specialty.length > 0) {
      const specialtiesId = person.specialty.map(
        (relation) => relation.specialty.id,
      );
      deletedPersonSPecialty = await this.personSpecialtyService.multiDelete(
        person.id,
        specialtiesId,
        entityManager,
      );
    }

    return {
      ...deletedPerson.raw[0],
      ...deletedPersonSPecialty,
    };
  }
}
