import { Module } from '@nestjs/common';

import { AppointmentController } from './controller/appointment.controller';

import { AppointmentService } from './services/appointment.service';
import { OdontogramModule } from '@/odontogram/odontogram.module';

@Module({
  imports: [OdontogramModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
