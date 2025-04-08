import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
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
