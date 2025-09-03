import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as dayjs from 'dayjs';

import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { FilterPatientDto } from '../dto/filter-patient.dto';

import { Patient } from '../entities/patient.entity';
import { User } from '@/user/entities/user.entity';

import { PaginationHelper } from '@/common/helpers/pagination-helper';
import { unaccent } from '@/common/utils/unaccent';

import { PersonService } from '@/person/services/person.service';
import { UserService } from '@/user/services/user.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly personService: PersonService,
  ) {}

  create(createPatientDto: CreatePatientDto): Promise<Patient> {
    createPatientDto.person_type_id = 5;

    return this.dataSource.transaction(async (manager) => {
      let newUser: User | null = null;
      if (createPatientDto.email && createPatientDto.password) {
        newUser = await this.userService.createWithEntity(manager, {
          email: createPatientDto.email,
          password: createPatientDto.password,
          role_ids: createPatientDto.role_ids || [2],
        });
      }

      const person = await this.personService.createWithEnetity(manager, {
        first_name: createPatientDto.first_name,
        last_name: createPatientDto.last_name,
        middle_name: createPatientDto.middle_name,
        person_type_id: createPatientDto.person_type_id,
        user_id: newUser ? newUser.id : undefined,
        personContact: createPatientDto.person_contacts,
        profile_picture: createPatientDto.profile_picture,
        profile_picture_name: createPatientDto.profile_picture_name,
      });

      const createPatient = manager.create(Patient, {
        birth_date: createPatientDto.birth_date,
        address: createPatientDto.address,
        phone: createPatientDto.phone,
        allergic_reactions: createPatientDto.allergic_reactions,
        medical_history: createPatientDto.medical_history,
        complete_odontogram: createPatientDto.complete_odontogram,
        current_systemic_treatment: createPatientDto.current_systemic_treatment,
        gender: createPatientDto.gender,
        lab_results: createPatientDto.lab_results,
        occupation: createPatientDto.occupation,
        se: createPatientDto.se,
        sgi: createPatientDto.sgi,
        sgu: createPatientDto.sgu,
        sr: createPatientDto.sr,
        sme: createPatientDto.sme,
        snc: createPatientDto.snc,
        su: createPatientDto.su,
        svc: createPatientDto.svc,
        systemNotes1: createPatientDto.systemNotes1,
        systemNotes2: createPatientDto.systemNotes2,
        person_id: person.id,
      });

      const newPatient = await manager.save(Patient, createPatient);

      return {
        ...newPatient,
      };
    });
  }

  async findAll(
    filterPatientDto: FilterPatientDto,
    res: Response,
  ): Promise<
    {
      id: number;
      fullName: string;
      phone: string;
      birth_date: Date;
      age: number;
    }[]
  > {
    const selectQuery = this.patientRepository.createQueryBuilder('patient');

    if (filterPatientDto.search) {
      const searchNormalized = unaccent(filterPatientDto.search);
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
            });
        }),
      );
    }

    selectQuery
      .leftJoinAndSelect('patient.person', 'person')
      .leftJoinAndSelect('person.user', 'user');

    if (filterPatientDto.pagination) {
      PaginationHelper.paginate(
        selectQuery,
        filterPatientDto.page,
        filterPatientDto.per_page,
      );
    }

    const [patients, count] = await selectQuery.getManyAndCount();

    if (filterPatientDto.pagination) {
      PaginationHelper.setHeaders(res, count, filterPatientDto);
    }

    const patientsDto = patients.map((patient) => ({
      id: patient.id,
      fullName:
        `${patient.person.first_name} ${patient.person.middle_name ?? ''} ${patient.person.last_name}`.trim(),
      phone: patient.phone,
      birth_date: patient.birth_date,
      age: dayjs().diff(dayjs(patient.birth_date), 'year'),
    }));

    return patientsDto;
  }

  findOne(id: number): string {
    return `This action returns a #${id} patient`;
  }

  update(id: number, _updatePatientDto: UpdatePatientDto): string {
    return `This action updates a #${id} patient`;
  }

  remove(id: number): string {
    return `This action removes a #${id} patient`;
  }
}
