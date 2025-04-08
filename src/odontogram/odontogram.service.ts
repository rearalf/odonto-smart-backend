import { Injectable } from '@nestjs/common';
import { CreateOdontogramDto } from './dto/create-odontogram.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram.dto';

@Injectable()
export class OdontogramService {
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
