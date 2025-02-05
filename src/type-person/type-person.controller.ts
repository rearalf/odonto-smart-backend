import { Controller } from '@nestjs/common';
import { TypePersonService } from './type-person.service';

@Controller('type-person')
export class TypePersonController {
  constructor(private readonly typePersonService: TypePersonService) {}
}
