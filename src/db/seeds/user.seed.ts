import { ConfigService } from '@nestjs/config';
import { DataSource, EntityManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '@/user/entities/user.entity';
import { Seeder } from './seeder';

export class UserSeed extends Seeder {
  constructor(
    readonly dataSource: DataSource,
    readonly configService: ConfigService,
  ) {
    super(dataSource);
  }

  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: 1,
          email: this.configService.get('USER_EMAIL'),
          password: bcrypt.hashSync(
            this.configService.get('USER_PASSWORD'),
            10,
          ),
        },
      ])
      .execute();
  }
}
