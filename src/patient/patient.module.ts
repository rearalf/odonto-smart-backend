import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PatientService } from './services/patient.service';

import { Patient } from './entities/patient.entity';

import { PatientController } from './controller/patient.controller';

import { PersonModule } from '@/person/person.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), PersonModule, UserModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
