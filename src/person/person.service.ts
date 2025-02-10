import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PersonSpecialtyService } from '../person-specialty/person-specialty.service';
import { PersonTypeService } from 'src/person-type/person-type.service';
import { SpecialtyService } from '../specialty/specialty.service';

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

  async create(createPersonDto: CreatePersonDto) {
    const personType = await this.personTypeService.findOneById(
      createPersonDto.personType,
    );

    if (!personType)
      throw new NotFoundException('Tipo de persona no encontrado.');

    const createdPerson = this.personRepository.create({
      first_name: createPersonDto.first_name,
      last_name: createPersonDto.last_name,
      middle_name: createPersonDto.middle_name,
      personType,
    });

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
        );

        specialties.push(savedSpecialty.specialty);
      }
    }

    const savedPerson = await this.personRepository.save(createdPerson);

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
