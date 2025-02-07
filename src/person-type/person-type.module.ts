import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PersonType } from './entities/person-type.entity';
import { PersonTypeService } from './person-type.service';

@Module({
  exports: [PersonTypeService],
  providers: [PersonTypeService],
  imports: [TypeOrmModule.forFeature([PersonType])],
})
export class PersonTypeModule {}
