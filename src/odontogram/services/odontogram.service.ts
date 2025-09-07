import { Injectable } from '@nestjs/common';
import { CreateOdontogramDto } from '../dto/create-odontogram.dto';
import { UpdateOdontogramDto } from '../dto/update-odontogram.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Odontogram } from '../entities/odontogram.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OdontogramService {
  constructor(
    @InjectRepository(Odontogram)
    private readonly odontogramRepository: Repository<Odontogram>,
  ) {}

  async findOdontogram(
    type: 'patient' | 'appointment',
    id: number,
  ): Promise<Odontogram | null> {
    const query = this.odontogramRepository
      .createQueryBuilder('odontogram')
      .leftJoinAndSelect('odontogram.tooth', 'tooth');

    if (type === 'patient') {
      query
        .where('odontogram.patient_id = :id', { id })
        .andWhere('odontogram.appointment_id IS NULL');
    } else if (type === 'appointment') {
      query
        .where('odontogram.appointment_id = :id', { id })
        .andWhere('odontogram.patient_id IS NULL');
    }

    return await query.getOne();
  }

  create(_createOdontogramDto: CreateOdontogramDto): string {
    return 'This action adds a new odontogram';
  }

  findAll(): string {
    return `This action returns all odontogram`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} odontogram`;
  }

  update(id: number, _updateOdontogramDto: UpdateOdontogramDto): string {
    return `This action updates a #${id} odontogram`;
  }

  remove(id: number): string {
    return `This action removes a #${id} odontogram`;
  }
}
