import { Module } from '@nestjs/common';
import { PersonContactService } from './person-contact.service';
import { PersonContactController } from './person-contact.controller';

@Module({
  controllers: [PersonContactController],
  providers: [PersonContactService],
})
export class PersonContactModule {}
