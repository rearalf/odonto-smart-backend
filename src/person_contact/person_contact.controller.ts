import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonContactService } from './person_contact.service';
import { CreatePersonContactDto } from './dto/create-person_contact.dto';
import { UpdatePersonContactDto } from './dto/update-person_contact.dto';

@Controller('person-contact')
export class PersonContactController {
  constructor(private readonly personContactService: PersonContactService) {}

  @Post()
  create(@Body() createPersonContactDto: CreatePersonContactDto) {
    return this.personContactService.create(createPersonContactDto);
  }

  @Get()
  findAll() {
    return this.personContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personContactService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonContactDto: UpdatePersonContactDto,
  ) {
    return this.personContactService.update(+id, updatePersonContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personContactService.remove(+id);
  }
}
