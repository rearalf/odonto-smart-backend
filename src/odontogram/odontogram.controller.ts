import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OdontogramService } from './odontogram.service';
import { CreateOdontogramDto } from './dto/create-odontogram.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram.dto';

@Controller('odontogram')
export class OdontogramController {
  constructor(private readonly odontogramService: OdontogramService) {}

  @Post()
  create(@Body() createOdontogramDto: CreateOdontogramDto): string {
    return this.odontogramService.create(createOdontogramDto);
  }

  @Get()
  findAll(): string {
    return this.odontogramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.odontogramService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateOdontogramDto: UpdateOdontogramDto,
  ): string {
    return this.odontogramService.update(id, updateOdontogramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.odontogramService.remove(id);
  }
}
