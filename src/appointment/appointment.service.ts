import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  create(_createAppointmentDto: CreateAppointmentDto): string {
    return 'This action adds a new appointment';
  }

  findAll(): string {
    return `This action returns all appointment`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, _updateAppointmentDto: UpdateAppointmentDto): string {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number): string {
    return `This action removes a #${id} appointment`;
  }
}
