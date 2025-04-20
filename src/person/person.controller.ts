import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonService } from './services/person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto): string {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll(): string {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ): string {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.personService.remove(id);
  }
}
