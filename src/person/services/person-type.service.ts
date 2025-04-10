import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PersonType } from '../entities/person_type.entity';

@Injectable()
export class PersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private readonly personTypeRepository: Repository<PersonType>,
  ) {}

  async findAll(): Promise<PersonType[]> {
    const personType = await this.personTypeRepository
      .createQueryBuilder('person_type')
      .select(['id', 'name', 'description'])
      .getMany();

    return personType;
  }
}
