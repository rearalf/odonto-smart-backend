import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { SeedRegistry } from './entities/seed-registry.entity';

@Module({
  controllers: [],
  imports: [ConfigModule, TypeOrmModule.forFeature([SeedRegistry])],
  exports: [],
  providers: [],
})
export class DbModule {}
