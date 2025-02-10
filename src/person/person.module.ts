import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PersonSpecialtyModule } from 'src/person-specialty/person-specialty.module';
import { PersonTypeModule } from 'src/person-type/person-type.module';
import { SpecialtyModule } from 'src/specialty/specialty.module';

import { PersonService } from './person.service';
import { PersonController } from './person.controller';

import { Person } from './entities/person.entity';

@Module({
  exports: [PersonService],
  providers: [PersonService],
  controllers: [PersonController],
  imports: [
    PersonTypeModule,
    SpecialtyModule,
    PersonSpecialtyModule,
    TypeOrmModule.forFeature([Person]),
  ],
})
export class PersonModule {}
