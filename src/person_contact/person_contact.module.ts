import { Module } from '@nestjs/common';
import { PersonContactService } from './person_contact.service';
import { PersonContactController } from './person_contact.controller';

@Module({
  controllers: [PersonContactController],
  providers: [PersonContactService],
})
export class PersonContactModule {}
