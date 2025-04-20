import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DoctorSpecialtyService } from './services/doctor-specialty.service';
import { SpecialtyService } from './services/specialty.service';
import { DoctorService } from './doctor.service';

import { DoctorController } from './doctor.controller';

import { DoctorSpecialty } from './entities/doctor-specialty.entity';
import { Specialty } from './entities/specialty.entity';
import { Doctor } from './entities/doctor.entity';

import { PersonModule } from '@/person/person.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Specialty, DoctorSpecialty]),
    PersonModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService, SpecialtyService, DoctorSpecialtyService],
})
export class DoctorModule {}
