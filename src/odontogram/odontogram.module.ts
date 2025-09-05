import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Odontogram } from './entities/odontogram.entity';

import { OdontogramController } from './controller/odontogram.controller';

import { OdontogramService } from './services/odontogram.service';

@Module({
  imports: [TypeOrmModule.forFeature([Odontogram])],
  controllers: [OdontogramController],
  providers: [OdontogramService],
})
export class OdontogramModule {}
