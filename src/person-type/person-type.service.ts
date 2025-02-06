import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PersonType } from './entities/person-type.entity';

@Injectable()
export class PersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private readonly personTypeRepository: Repository<PersonType>,
  ) {}

  async findAll() {
    const personTypes = await this.personTypeRepository
      .createQueryBuilder('person_type')
      .select(['person_type.id', 'person_type.name', 'person_type.description'])
      .getMany();

    return {
      personTypes,
    };
  }

  async findOneById(id: number) {
    if (!id || typeof id === 'number')
      throw new NotFoundException('Id no valido');

    const personType = await this.personTypeRepository
      .createQueryBuilder('person_type')
      .where('specialty.id = :id', { id })
      .select(['person_type.id', 'person_type.name', 'person_type.description'])
      .getOne();

    return {
      personType,
    };
  }
}
