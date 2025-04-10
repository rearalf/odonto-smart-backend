import { Controller, Get } from '@nestjs/common';
import { PersonTypeService } from '../services/person-type.service';
import { PersonType } from '../entities/person_type.entity';

@Controller('person-type')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Get()
  async findAll(): Promise<PersonType[]> {
    return await this.personTypeService.findAll();
  }
}
