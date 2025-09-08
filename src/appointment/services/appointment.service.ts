import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateInstantAppointmentDto } from '../dto/create-instant-appointment.dto';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(private readonly dataSource: DataSource) {}

  async handleInstantAppointment(
    createInstantAppointmentDto: CreateInstantAppointmentDto,
  ): Promise<void> {
    return await this.dataSource.transaction(async (manager) => {
      if (
        createInstantAppointmentDto.start_time >=
        createInstantAppointmentDto.end_time
      )
        throw new BadRequestException(
          'La hora de inicio debe ser menor a la hora de fin',
        );

      const startDate = new Date(createInstantAppointmentDto.start_time);
      const appointmentDate = new Date(
        createInstantAppointmentDto.appointment_date,
      );

      if (
        startDate.getFullYear() !== appointmentDate.getFullYear() ||
        startDate.getMonth() !== appointmentDate.getMonth() ||
        startDate.getDate() !== appointmentDate.getDate()
      )
        throw new BadRequestException(
          'La fecha de la cita debe coincidir con la fecha de inicio',
        );

      const _appointmentSaved = await manager.save(Appointment, {
        patient_id: createInstantAppointmentDto.patient_id,
        doctor_id: createInstantAppointmentDto.doctor_id,
        appointment_date: createInstantAppointmentDto.appointment_date,
        reason: createInstantAppointmentDto.reason,
        notes: createInstantAppointmentDto.notes,
      });
    });
  }

  // create(_createAppointmentDto: CreateAppointmentDto): string {
  //   return 'This action adds a new appointment';
  // }
  // findAll(): string {
  //   return `This action returns all appointment`;
  // }
  // findOne(id: number): string {
  //   return `This action returns a #${id} appointment`;
  // }
  // update(id: number, _updateAppointmentDto: UpdateAppointmentDto): string {
  //   return `This action updates a #${id} appointment`;
  // }
  // remove(id: number): string {
  //   return `This action removes a #${id} appointment`;
  // }
}
