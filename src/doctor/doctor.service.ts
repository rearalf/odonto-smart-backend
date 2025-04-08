import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  create(_createDoctorDto: CreateDoctorDto): string {
    return 'This action adds a new doctor';
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
