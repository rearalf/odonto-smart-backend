import { Controller } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('access_cookie')
@Controller('type-person')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}
}
