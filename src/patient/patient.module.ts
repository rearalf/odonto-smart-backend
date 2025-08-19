import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PatientController } from './controller/patient.controller';
import { PatientService } from './services/patient.service';
import { PersonModule } from '@/person/person.module';

import { Patient } from './entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), PersonModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
