import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Doctor } from './entities/doctor.entity';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { DoctorSpecialtyService } from './services/doctor-specialty.service';
import { PersonService } from '@/person/services/person.service';
import { SpecialtyService } from './services/specialty.service';

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

  findAll(): string {
    return `This action returns all doctor`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, _updateDoctorDto: UpdateDoctorDto): string {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number): string {
    return `This action removes a #${id} doctor`;
  }
}
