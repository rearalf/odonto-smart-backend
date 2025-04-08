import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  create(_createPatientDto: CreatePatientDto): string {
    return 'This action adds a new patient';
  }

  findAll(): string {
    return `This action returns all patient`;
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
