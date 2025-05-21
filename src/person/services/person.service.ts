import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

import { PersonContact } from '../entities/person_contact.entity';
import { Person } from '../entities/person.entity';
import { User } from '@/user/entities/user.entity';

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

  async createWithEnetity(
    manager: EntityManager,
    createPersonDto: CreatePersonDto,
  ): Promise<Person & { user: User }> {
    await this.personTypeService.findById(createPersonDto.person_type_id);

    const user = await this.userService.createWithEntity(
      manager,
      createPersonDto.user,
    );

    const createPerson = manager.create(Person, {
      first_name: createPersonDto.first_name,
      middle_name: createPersonDto.middle_name,
      last_name: createPersonDto.last_name,
      person_type_id: createPersonDto.person_type_id,
      user_id: user.id,
    });

    const savedPerson = await manager.save(Person, createPerson);

    const contacts: PersonContact[] = [];

    if (createPersonDto.personContact) {
      const savedContacts = await this.personContactService.create(
        manager,
        createPersonDto.personContact,
      );

      contacts.push(...savedContacts);
    }

    return {
      ...savedPerson,
      user,
      contacts,
    };
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
