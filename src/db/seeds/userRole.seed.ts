import { DataSource, EntityManager } from 'typeorm';
import { Seeder } from './seeder';
import { UserRole } from '@/user/entities/user-role.entity';

export class UserRoleSeed extends Seeder {
  constructor(readonly dataSource: DataSource) {
    super(dataSource);
  }

  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(UserRole)
      .values([
        {
          id: 1,
          role_id: 1,
          user_id: 1,
        },
      ])
      .execute();
  }
}
