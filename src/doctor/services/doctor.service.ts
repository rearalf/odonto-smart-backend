import { Repository, DataSource, Brackets, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

import { Doctor } from '../entities/doctor.entity';

import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { FilterDoctorDto } from '../dto/filter-doctor.dto';

import { PaginationHelper } from '@/common/helpers/pagination-helper';
import { unaccent } from '@/common/utils/unaccent';

import { DoctorSpecialtyService } from './doctor-specialty.service';
import { PersonService } from '@/person/services/person.service';
import { UserService } from '@/user/services/user.service';
import { SpecialtyService } from './specialty.service';

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
    private readonly userService: UserService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    createDoctorDto.person_type_id = 4;

    await this.specialtyService.findById(createDoctorDto.specialty_id);

    return await this.dataSource.transaction(async (manager) => {
      const newUser = await this.userService.createWithEntity(manager, {
        email: createDoctorDto.email,
        password: createDoctorDto.password,
        role_ids: createDoctorDto.role_ids,
        permission_ids: createDoctorDto.permission_ids || [],
      });

      const person = await this.personService.createWithEnetity(manager, {
        first_name: createDoctorDto.first_name,
        last_name: createDoctorDto.last_name,
        middle_name: createDoctorDto.middle_name,
        person_type_id: createDoctorDto.person_type_id,
        user_id: newUser ? newUser.id : undefined,
        personContact: createDoctorDto.person_contacts,
        profile_picture: createDoctorDto.profile_picture,
        profile_picture_name: createDoctorDto.profile_picture_name,
      });

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
    const permissions: {
      id: number;
      name: string;
      description: string;
      label: string;
    }[] = [];

    if (!doctor) throw new NotFoundException('Doctor no encontrado.');

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
          label: permission.permission.label,
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

  async getDoctorListToSelect(): Promise<{ id: number; name: string }[]> {
    const doctors = await this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.person', 'person')
      .getMany();

    return doctors.map((doc) => ({
      id: doc.id,
      name: `${doc.person.first_name} ${
        doc.person.middle_name ? doc.person.middle_name + ' ' : ''
      }${doc.person.last_name}`,
    }));
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const existingDoctor = await this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.person', 'person')
      .leftJoinAndSelect('person.user', 'user')
      .leftJoinAndSelect('doctor.doctorSpecialty', 'doctorSpecialty')
      .where('doctor.id = :id', { id })
      .getOne();

    if (!existingDoctor) {
      throw new NotFoundException('Doctor no encontrado.');
    }

    // Validar especialidad principal si se proporciona
    if (updateDoctorDto.specialty_id) {
      await this.specialtyService.findById(updateDoctorDto.specialty_id);
    }

    return await this.dataSource.transaction(async (manager) => {
      const {
        qualification,
        specialty_id,
        first_name,
        middle_name,
        last_name,
        profile_picture,
        profile_picture_name,
        email,
        password,
        specialty_ids,
        role_ids,
        permission_ids,
        person_contacts,
        ..._rest
      } = updateDoctorDto;

      const removeUndefined = (obj: Record<string, any>): Record<string, any> =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, value]) => value !== undefined),
        );

      // Actualizar doctor
      const doctorData = removeUndefined({ qualification, specialty_id });
      if (Object.keys(doctorData).length > 0) {
        await manager.update(Doctor, id, doctorData);
      }

      // Actualizar persona
      const personData = removeUndefined({
        first_name,
        middle_name,
        last_name,
        profile_picture,
        profile_picture_name,
      });
      if (Object.keys(personData).length > 0) {
        await manager.update('Person', existingDoctor.person.id, personData);
      }

      // Actualizar usuario
      if (existingDoctor.person.user) {
        const userData = removeUndefined({ email, password });
        if (Object.keys(userData).length > 0) {
          await manager.update('User', existingDoctor.person.user.id, userData);
        }

        // Manejar roles del usuario
        if (role_ids !== undefined) {
          // Eliminar roles existentes
          await manager.delete('UserRole', {
            user_id: existingDoctor.person.user.id,
          });

          // Agregar nuevos roles
          if (role_ids && role_ids.length > 0) {
            for (const roleId of role_ids) {
              const userRole = manager.create('UserRole', {
                user_id: existingDoctor.person.user.id,
                role_id: roleId,
              });
              await manager.save('UserRole', userRole);
            }
          }
        }

        // Manejar permisos del usuario
        if (permission_ids !== undefined) {
          // Eliminar permisos existentes
          await manager.delete('UserPermission', {
            user_id: existingDoctor.person.user.id,
          });

          // Agregar nuevos permisos
          if (permission_ids && permission_ids.length > 0) {
            for (const permissionId of permission_ids) {
              const userPermission = manager.create('UserPermission', {
                user_id: existingDoctor.person.user.id,
                permission_id: permissionId,
              });
              await manager.save('UserPermission', userPermission);
            }
          }
        }
      }

      // Manejar contactos de la persona
      if (person_contacts !== undefined) {
        // Eliminar contactos existentes
        await manager.delete('PersonContact', {
          person_id: existingDoctor.person.id,
        });

        // Agregar nuevos contactos
        if (person_contacts && person_contacts.length > 0) {
          for (const contact of person_contacts) {
            const personContact = manager.create('PersonContact', {
              person_id: existingDoctor.person.id,
              contact_type: contact.contact_type,
              contact_value: contact.contact_value,
            });
            await manager.save('PersonContact', personContact);
          }
        }
      }

      // Manejar especialidades secundarias
      if (specialty_ids !== undefined) {
        await manager.delete('DoctorSpecialty', { doctor_id: id });

        // Agregar nuevas especialidades secundarias
        if (specialty_ids && specialty_ids.length > 0) {
          await this.doctorSpecialtyService.create(manager, id, specialty_ids);
        }
      }

      const updatedDoctor = await manager
        .createQueryBuilder(Doctor, 'doctor')
        .leftJoinAndSelect('doctor.person', 'person')
        .leftJoinAndSelect('person.user', 'user')
        .leftJoinAndSelect('doctor.specialty', 'specialty')
        .leftJoinAndSelect('doctor.doctorSpecialty', 'doctorSpecialty')
        .leftJoinAndSelect('doctorSpecialty.specialty', 'secondarySpecialty')
        .where('doctor.id = :id', { id })
        .getOne();
      return updatedDoctor;
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.doctorRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Doctor no encontrado.');
    }
  }
}
