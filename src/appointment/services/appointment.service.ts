import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import * as dayjs from 'dayjs';

import { CreateInstantAppointmentDto } from '../dto/create-instant-appointment.dto';
import { AppointmentsList } from '../schemas/appointment-list.schema';
import { FilterAppointmentDto } from '../dto/filter-appointment.dto';

import { Appointment } from '../entities/appointment.entity';

import { OdontogramService } from '@/odontogram/services/odontogram.service';

import { STATUS_ENUM } from '../../common/enums/appointment.enum';

import { PaginationHelper } from '@/common/helpers/pagination-helper';
import { unaccent } from '@/common/utils/unaccent';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly dataSource: DataSource,
    private readonly odontogramService: OdontogramService,
  ) {}

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

      const appointmentSaved = await manager.save(Appointment, {
        patient_id: createInstantAppointmentDto.patient_id,
        doctor_id: createInstantAppointmentDto.doctor_id,
        appointment_date: createInstantAppointmentDto.appointment_date,
        reason: createInstantAppointmentDto.reason,
        notes: createInstantAppointmentDto.notes,
        start_time: createInstantAppointmentDto.start_time,
        end_time: createInstantAppointmentDto.end_time,
        status: STATUS_ENUM.COMPLETED,
      });

      await this.odontogramService.createOdontogram(
        manager,
        appointmentSaved.id,
        createInstantAppointmentDto.patient_id,
        createInstantAppointmentDto.teeth,
      );
    });
  }

  async getAllAppointment(
    filterAppointmentDto: FilterAppointmentDto,
    res: Response,
  ): Promise<AppointmentsList[]> {
    const selectQuery = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.person', 'person');

    if (filterAppointmentDto.search) {
      const searchNormalized = unaccent(filterAppointmentDto.search);
      selectQuery.andWhere(
        new Brackets((qb) => {
          qb.where('unaccent(person.first_name) ILIKE :search', {
            search: `%${searchNormalized}%`,
          })
            .orWhere('unaccent(person.middle_name) ILIKE :search', {
              search: `%${searchNormalized}%`,
            })
            .orWhere('unaccent(person.last_name) ILIKE :search', {
              search: `%${searchNormalized}%`,
            });
        }),
      );
    }

    if (filterAppointmentDto.startDate) {
      selectQuery.andWhere('appointment.appointment_date >= :startDate', {
        startDate: filterAppointmentDto.startDate,
      });
    }

    if (filterAppointmentDto.endDate) {
      const endDate = dayjs(filterAppointmentDto.endDate).add(1, 'day');
      selectQuery.andWhere('appointment.appointment_date <= :endDate', {
        endDate,
      });
    }

    if (filterAppointmentDto.status) {
      selectQuery.andWhere('appointment.status = :status', {
        status: filterAppointmentDto.status,
      });
    }

    if (filterAppointmentDto.pagination) {
      PaginationHelper.paginate(
        selectQuery,
        filterAppointmentDto.page,
        filterAppointmentDto.per_page,
      );
    }

    const [appointments, count] = await selectQuery.getManyAndCount();

    if (filterAppointmentDto.pagination) {
      PaginationHelper.setHeaders(res, count, filterAppointmentDto);
    }

    const appointmentsDto = appointments.map((appointment) => ({
      id: appointment.id,
      appointment_date: appointment.appointment_date,
      status: appointment.status,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      patient_id: appointment.patient.id,
      birth_date: appointment.patient.birth_date,
      gender: appointment.patient.gender,
      full_name:
        `${appointment.patient.person?.first_name ?? ''} ${appointment.patient.person?.middle_name ?? ''} ${appointment.patient.person?.last_name ?? ''}`.trim(),
    }));

    return appointmentsDto;
  }
}
