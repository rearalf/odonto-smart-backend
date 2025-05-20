import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DoctorSpecialtyService } from './services/doctor-specialty.service';
import { SpecialtyService } from './services/specialty.service';
import { DoctorService } from './services/doctor.service';

import { SpecialtyController } from './controller/specialty.controller';
import { DoctorController } from './controller/doctor.controller';

import { DoctorSpecialty } from './entities/doctor-specialty.entity';
import { Specialty } from './entities/specialty.entity';
import { Doctor } from './entities/doctor.entity';

import { PersonModule } from '@/person/person.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Specialty, DoctorSpecialty]),
    PersonModule,
  ],
  controllers: [DoctorController, SpecialtyController],
  providers: [DoctorService, SpecialtyService, DoctorSpecialtyService],
})
export class DoctorModule {}
