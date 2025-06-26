import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { Doctor } from '../entities/doctor.entity';

import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { FilterDoctorDto } from '../dto/filter-doctor.dto';
import { IDoctorResponse } from '@/common/dto/doctor.dto';

import { PaginationHelper } from '@/common/helpers/pagination-helper';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import { PersonService } from '@/person/services/person.service';
import { SpecialtyService } from './specialty.service';
import { unaccent } from '@/common/utils/unaccent';
import { Specialty } from '../entities/specialty.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly dataSource: DataSource,
    private readonly doctorSpecialtyService: DoctorSpecialtyService,
    private readonly specialtyService: SpecialtyService,
    private readonly personService: PersonService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    createDoctorDto.person.person_type_id = 4;

    await this.specialtyService.findById(createDoctorDto.specialty_id);

    return await this.dataSource.transaction(async (manager) => {
      const person = await this.personService.createWithEnetity(
        manager,
        createDoctorDto.person,
      );

      const createDoctor = manager.create(Doctor, {
        qualification: createDoctorDto.qualification,
        specialty_id: createDoctorDto.specialty_id,
        person_id: person.id,
      });

      const newDoctor = await manager.save(Doctor, createDoctor);

      if (
        createDoctorDto.specialty_ids &&
        createDoctorDto.specialty_ids.length > 0
      ) {
        await this.doctorSpecialtyService.create(
          manager,
          newDoctor.id,
          createDoctorDto.specialty_ids,
        );
      }

      return newDoctor;
    });
  }

  async findAll(
    filterDoctorDto: FilterDoctorDto,
    res: Response,
  ): Promise<
    {
      id: number;
      specialty: {
        id: number;
        name: string;
        description: string;
      };
      secondary_specialties: Specialty[];
      qualification: string;
      profile_picture: string;
      full_name: string;
      email: string;
    }[]
  > {
    const selectQuery = this.doctorRepository.createQueryBuilder('doctor');

    if (filterDoctorDto.search) {
      const searchNormalized = unaccent(filterDoctorDto.search);
      selectQuery
        .where('unaccent(person.first_name) ILIKE :filtro', {
          filtro: `%${searchNormalized}%`,
        })
        .orWhere('unaccent(person.middle_name) ILIKE :filtro', {
          filtro: `%${searchNormalized}%`,
        })
        .orWhere('unaccent(person.last_name) ILIKE :filtro', {
          filtro: `%${searchNormalized}%`,
        })
        .orWhere('unaccent(user.email) ILIKE :filtro', {
          filtro: `%${searchNormalized}%`,
        });
    }

    selectQuery
      .leftJoinAndSelect('doctor.person', 'person')
      .leftJoinAndSelect('person.user', 'user')
      .leftJoinAndSelect('doctor.specialty', 'main_specialty')
      .leftJoinAndSelect('doctor.doctorSpecialty', 'doctor_specialty')
      .leftJoinAndSelect('doctor_specialty.specialty', 'secondary_specialty');

    if (filterDoctorDto.pagination) {
      PaginationHelper.paginate(
        selectQuery,
        filterDoctorDto.page,
        filterDoctorDto.per_page,
      );
    }

    const [doctors, count] = await selectQuery.getManyAndCount();

    if (filterDoctorDto.pagination) {
      PaginationHelper.setHeaders(res, count, filterDoctorDto);
    }

    const doctorsDto = doctors.map((doc) => ({
      id: doc.id,
      specialty: {
        id: doc.specialty?.id,
        name: doc.specialty?.name,
        description: doc.specialty?.description,
      },
      secondary_specialties:
        doc.doctorSpecialty?.map((ds) => ds.specialty) ?? [],
      qualification: doc.qualification ?? null,
      profile_picture: doc.person?.profile_picture ?? null,
      full_name:
        `${doc.person?.first_name ?? ''} ${doc.person?.middle_name ?? ''} ${doc.person?.last_name ?? ''}`.trim(),
      email: doc.person?.user?.email ?? null,
    }));

    return doctorsDto;
  }

  async findOne(id: number): Promise<IDoctorResponse> {
    const doctor: Doctor = await this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.specialty', 'mainSpecialty')
      .leftJoinAndSelect('doctor.doctorSpecialty', 'doctorSpecialty')
      .leftJoinAndSelect('doctorSpecialty.specialty', 'secondarySpecialty')
      .leftJoinAndSelect('doctor.person', 'person')
      .leftJoinAndSelect('person.user', 'user')
      .leftJoinAndSelect('user.user_role', 'userRole')
      .leftJoinAndSelect('userRole.role', 'Role')
      .leftJoinAndSelect('user.user_permission', 'userPermission')
      .leftJoinAndSelect('userPermission.permission', 'permission')
      .where('doctor.id = :id', { id })
      .getOne();

    const specialties = [];
    const roles = [];
    const permissions = [];

    if (doctor.doctorSpecialty.length > 0) {
      for (const specialty of doctor.doctorSpecialty) {
        specialties.push({
          id: specialty.specialty.id,
          name: specialty.specialty.name,
        });
      }
    }

    if (doctor.person.user.user_role) {
      for (const role of doctor.person.user.user_role) {
        roles.push({
          id: role.role.id,
          name: role.role.name,
        });
      }
    }

    if (doctor.person.user.user_permission) {
      for (const permission of doctor.person.user.user_permission) {
        permissions.push({
          id: permission.permission.id,
          name: permission.permission.name,
        });
      }
    }

    const returnJson = {
      id: doctor.id,
      qualification: doctor.qualification || null,
      specialty: {
        id: doctor.specialty.id,
        name: doctor.specialty.name,
        description: doctor.specialty.description,
      },
      specialties,
      first_name: doctor.person.first_name,
      middle_name: doctor.person.middle_name,
      last_name: doctor.person.last_name,
      email: doctor.person.user.email,
      password: doctor.person.user.password,
      roles,
      permissions,
    };

    return returnJson;
  }

  update(id: number, _updateDoctorDto: UpdateDoctorDto): string {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number): string {
    return `This action removes a #${id} doctor`;
  }
}
