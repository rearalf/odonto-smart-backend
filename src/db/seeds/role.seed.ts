import { Role } from '@/user/entities/role.entity';
import { Seeder } from './seeder';
import { DataSource, EntityManager } from 'typeorm';
import { roleSeeds } from './seeder-values';

export class RoleSeed extends Seeder {
  constructor(readonly dataSource: DataSource) {
    super(dataSource);
  }

  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([...roleSeeds])
      .execute();
  }
}
