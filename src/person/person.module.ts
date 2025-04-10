import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PersonTypeController } from './controller/person-type.controller';
import { PersonController } from './person.controller';

import { PersonTypeService } from './services/person-type.service';
import { PersonService } from './person.service';

import { PersonType } from './entities/person_type.entity';

@Module({
  controllers: [PersonController, PersonTypeController],
  imports: [TypeOrmModule.forFeature([PersonType])],
  providers: [PersonService, PersonTypeService],
})
export class PersonModule {}
