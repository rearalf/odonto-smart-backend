import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { PersonSpecialty } from 'src/person-specialty/entities/person-specialty.entity';
import { PersonTypeService } from 'src/person-type/person-type.service';
import { SpecialtyService } from '../specialty/specialty.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    private readonly personTypeService: PersonTypeService,
    private readonly specialtyService: SpecialtyService,
  ) {}

  async create(entityManager: EntityManager, createPersonDto: CreatePersonDto) {
    const repository = entityManager.getRepository(Person);
    const pivotSpecialty = entityManager.getRepository(PersonSpecialty);

    const { personType } = await this.personTypeService.findOneById(
      createPersonDto.personType,
    );

    if (personType)
      throw new NotFoundException('No se encontro ese tipo de persona.');

    const createdPerson = repository.create({
      first_name: createPersonDto.first_name,
      last_name: createPersonDto.last_name,
      middle_name: createPersonDto.middle_name,
      personType,
    });

    // const newPerson = await repository.save(createdPerson);

    const specialties: PersonSpecialty[] = [];

    if (createPersonDto.specialty) {
      for (const specialtyId of createPersonDto.specialty) {
        const { specialty } =
          await this.specialtyService.findOneById(specialtyId);

        const createPivot = pivotSpecialty.create({
          person: createdPerson, // TODO: Cambiar esto
          specialty,
        });

        // const newPivotSpecialty = await pivotSpecialty.save(createPivot);

        specialties.push(createPivot);
      }
    }

    return {
      person: {
        ...createdPerson,
        specialties,
      },
    };
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, _updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
