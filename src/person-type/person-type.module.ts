import { Module } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { PersonTypeController } from './person-type.controller';

@Module({
  controllers: [PersonTypeController],
  providers: [PersonTypeService],
})
export class PersonTypeModule {}
