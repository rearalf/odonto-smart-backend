import { Injectable } from '@nestjs/common';
import { CreatePersonContactDto } from './dto/create-person-contact.dto';
import { UpdatePersonContactDto } from './dto/update-person-contact.dto';

@Injectable()
export class PersonContactService {
  create(_createPersonContactDto: CreatePersonContactDto) {
    return 'This action adds a new personContact';
  }

  findAll() {
    return `This action returns all personContact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personContact`;
  }

  update(id: number, _updatePersonContactDto: UpdatePersonContactDto) {
    return `This action updates a #${id} personContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} personContact`;
  }
}
