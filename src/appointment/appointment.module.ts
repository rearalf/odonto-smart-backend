import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AppointmentController } from './controller/appointment.controller';

import { AppointmentService } from './services/appointment.service';
import { OdontogramModule } from '@/odontogram/odontogram.module';

import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), OdontogramModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
