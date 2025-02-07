import { Module } from '@nestjs/common';

import { PersonTypeModule } from 'src/person-type/person-type.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { SpecialtyModule } from 'src/specialty/specialty.module';

@Module({
  exports: [PersonService],
  providers: [PersonService],
  controllers: [PersonController],
  imports: [PersonTypeModule, SpecialtyModule],
})
export class PersonModule {}
