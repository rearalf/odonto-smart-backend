import { EntityManager } from 'typeorm';

import { EnvConfiguration } from 'src/config/env.config';

import { UserRole } from 'src/user-role/entities/user-role.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Person } from 'src/person/entities/person.entity';

class UserSeeds {
  constructor(private readonly entityManager: EntityManager) {}

  async createUsersSeeds(person: Person, roles: Role[]) {
    if (!Array.isArray(roles)) {
      await this.entityManager.connection.destroy();
      return [];
    }

    const repository = this.entityManager.getRepository(User);
    const pivotRepository = this.entityManager.getRepository(UserRole);

    const create = await repository.create({
      email: EnvConfiguration().email,
      password: EnvConfiguration().password,
      person,
    });

    const saved = await repository.save(create);

    const pivotcreate = pivotRepository.create({
      user: saved,
      role: roles[0],
    });

    await pivotRepository.save(pivotcreate);
  }
}

export default UserSeeds;
