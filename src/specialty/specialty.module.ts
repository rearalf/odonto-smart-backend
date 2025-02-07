import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [AuthModule],
  exports: [SpecialtyService],
  providers: [SpecialtyService],
  controllers: [SpecialtyController],
})
export class SpecialtyModule {}
