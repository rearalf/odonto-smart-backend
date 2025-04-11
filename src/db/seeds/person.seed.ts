import { EntityManager } from 'typeorm';

import { Person } from '@/person/entities/person.entity';
import { personSeeds } from './seeder-values';
import { Seeder } from './seeder';

export class PersonSeed extends Seeder {
  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(Person)
      .values([...personSeeds])
      .execute();
  }
}
