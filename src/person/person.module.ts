import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PersonTypeController } from './controller/person-type.controller';
import { PersonController } from './person.controller';

import { PersonContactService } from './services/person-contact.service';
import { PersonTypeService } from './services/person-type.service';
import { PersonService } from './services/person.service';

import { PersonType } from './entities/person_type.entity';
import { PersonContact } from './entities/person_contact.entity';

import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonType, PersonContact]), UserModule],
  controllers: [PersonController, PersonTypeController],
  providers: [PersonService, PersonTypeService, PersonContactService],
  exports: [PersonService],
})
export class PersonModule {}
