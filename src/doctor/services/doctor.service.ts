import { Repository, DataSource, Brackets, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { Doctor } from '../entities/doctor.entity';

import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { FilterDoctorDto } from '../dto/filter-doctor.dto';

import { PaginationHelper } from '@/common/helpers/pagination-helper';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import { PersonService } from '@/person/services/person.service';
import { SpecialtyService } from './specialty.service';
import { unaccent } from '@/common/utils/unaccent';
import {
  DoctorItemSchema,
  DoctorListItemSchema,
} from '../schemas/doctor-list-item.schema';

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
  ): Promise<DoctorListItemSchema[]> {
    const selectQuery = this.doctorRepository.createQueryBuilder('doctor');

    if (filterDoctorDto.search) {
      const searchNormalized = unaccent(filterDoctorDto.search);
      selectQuery.andWhere(
        new Brackets((qb) => {
          qb.where('unaccent(person.first_name) ILIKE :filtro', {
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
        }),
      );
    }

    let matchingIdsQuery: SelectQueryBuilder<Doctor>;

    if (filterDoctorDto.specialtyId) {
      matchingIdsQuery = this.doctorRepository
        .createQueryBuilder('doctor')
        .leftJoin('doctor.doctorSpecialty', 'doctor_specialty')
        .where(
          new Brackets((qb) => {
            qb.where('doctor.specialty_id = :specialtyId', {
              specialtyId: filterDoctorDto.specialtyId,
            }).orWhere('doctor_specialty.specialty_id = :specialtyId', {
              specialtyId: filterDoctorDto.specialtyId,
            });
          }),
        )
        .select('doctor.id');
    }

    selectQuery
      .leftJoinAndSelect('doctor.person', 'person')
      .leftJoinAndSelect('person.user', 'user')
      .leftJoinAndSelect('doctor.specialty', 'main_specialty')
      .leftJoinAndSelect('doctor.doctorSpecialty', 'doctor_specialty')
      .leftJoinAndSelect('doctor_specialty.specialty', 'secondary_specialty');

    if (filterDoctorDto.specialtyId) {
      selectQuery
        .andWhere(`doctor.id IN (${matchingIdsQuery.getQuery()})`)
        .setParameters(matchingIdsQuery.getParameters());
    }

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
        doc.doctorSpecialty?.map((ds) => {
          return {
            id: ds.specialty.id,
            name: ds.specialty.name,
            description: ds.specialty.description,
          };
        }) ?? [],
      qualification: doc.qualification ?? null,
      profile_picture: doc.person?.profile_picture ?? null,
      full_name:
        `${doc.person?.first_name ?? ''} ${doc.person?.middle_name ?? ''} ${doc.person?.last_name ?? ''}`.trim(),
      email: doc.person?.user?.email ?? null,
    }));

    return doctorsDto;
  }

  async findOne(id: number): Promise<DoctorItemSchema> {
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

    const specialties: { id: number; name: string; description: string }[] = [];
    const roles: { id: number; name: string; description: string }[] = [];
    const permissions: { id: number; name: string; description: string }[] = [];

    if (doctor.doctorSpecialty.length > 0) {
      for (const specialty of doctor.doctorSpecialty) {
        specialties.push({
          id: specialty.specialty.id,
          name: specialty.specialty.name,
          description: specialty.specialty.description,
        });
      }
    }

    if (doctor.person.user.user_role) {
      for (const role of doctor.person.user.user_role) {
        roles.push({
          id: role.role.id,
          name: role.role.name,
          description: role.role.description,
        });
      }
    }

    if (doctor.person.user.user_permission) {
      for (const permission of doctor.person.user.user_permission) {
        permissions.push({
          id: permission.permission.id,
          name: permission.permission.name,
          description: permission.permission.description,
        });
      }
    }

    const returnJson: DoctorItemSchema = {
      id: doctor.id,
      qualification: doctor.qualification || null,
      specialty: {
        id: doctor.specialty.id,
        name: doctor.specialty.name,
        description: doctor.specialty.description,
      },
      specialties,
      full_name:
        `${doctor.person.first_name ?? ''} ${doctor.person?.middle_name ?? ''} ${doctor.person.last_name ?? ''}`.trim(),
      first_name: doctor.person.first_name,
      middle_name: doctor.person.middle_name,
      last_name: doctor.person.last_name,
      email: doctor.person.user.email,
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
