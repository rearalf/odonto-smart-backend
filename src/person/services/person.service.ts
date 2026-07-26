import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

import { PersonContact } from '../entities/person_contact.entity';
import { Person } from '../entities/person.entity';

import { UserService } from '../../user/services/user.service';
import { PersonContactService } from './person-contact.service';
import { PersonTypeService } from './person-type.service';

@Injectable()
export class PersonService {
  constructor(
    private readonly userService: UserService,
    private readonly personTypeService: PersonTypeService,
    private readonly personContactService: PersonContactService,
  ) {}

  async createWithEntity(
    manager: EntityManager,
    createPersonDto: CreatePersonDto,
  ): Promise<Person & { contacts: PersonContact[] }> {
    await this.personTypeService.findById(createPersonDto.person_type_id);

    const createPerson = manager.create(Person, {
      first_name: createPersonDto.first_name,
      middle_name: createPersonDto.middle_name,
      last_name: createPersonDto.last_name,
      person_type_id: createPersonDto.person_type_id,
      user_id: createPersonDto.user_id,
    });

    const savedPerson = await manager.save(Person, createPerson);

    const contacts: PersonContact[] = [];

    if (createPersonDto.personContact) {
      const savedContacts = await this.personContactService.create(
        manager,
        savedPerson.id,
        createPersonDto.personContact,
      );

      contacts.push(...savedContacts);
    }

    return {
      ...savedPerson,
      contacts,
    };
  }

  async updateEntity(
    manager: EntityManager,
    person_id: number,
    updateData: {
      first_name?: string;
      middle_name?: string;
      last_name?: string;
    },
  ): Promise<Person> {
    const person = await manager.findOneBy(Person, { id: person_id });
    if (!person) {
      throw new NotFoundException(`La persona con ID #${person_id} no existe.`);
    }

    if (updateData.first_name !== undefined) {
      person.first_name = updateData.first_name;
    }
    if (updateData.middle_name !== undefined) {
      person.middle_name = updateData.middle_name;
    }
    if (updateData.last_name !== undefined) {
      person.last_name = updateData.last_name;
    }

    return await manager.save(Person, person);
  }

  create(_createPersonDto: CreatePersonDto): string {
    return 'This action adds a new person';
  }

  findAll(): string {
    return `This action returns all person`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} person`;
  }

  update(id: number, _updatePersonDto: UpdatePersonDto): string {
    return `This action updates a #${id} person`;
  }

  remove(id: number): string {
    return `This action removes a #${id} person`;
  }
}
