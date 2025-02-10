import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialtyController } from './specialty.controller';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  exports: [SpecialtyService],
  providers: [SpecialtyService],
  controllers: [SpecialtyController],
})
export class SpecialtyModule {}
