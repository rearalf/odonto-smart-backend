import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonSpecialty } from './entities/person-specialty.entity';
import { PersonSpecialtyService } from './person-specialty.service';

@Module({
  exports: [PersonSpecialtyService],
  providers: [PersonSpecialtyService],
  imports: [TypeOrmModule.forFeature([PersonSpecialty])],
})
export class PersonSpecialtyModule {}
