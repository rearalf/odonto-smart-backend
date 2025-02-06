import { Controller } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';

@Controller('type-person')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}
}
