import { Module } from '@nestjs/common';
import { TypePersonService } from './type-person.service';
import { TypePersonController } from './type-person.controller';

@Module({
  controllers: [TypePersonController],
  providers: [TypePersonService],
})
export class TypePersonModule {}
