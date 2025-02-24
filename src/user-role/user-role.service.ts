import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { UserRole } from './entities/user-role.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(role: Role, user: User, entityManager?: EntityManager) {
    const useEntity =
      entityManager.getRepository(UserRole) || this.userRoleRepository;

    const createdRole = useEntity.create({
      role,
      user,
    });

    const saved = await useEntity.save(createdRole);

    return saved;
  }

  async multiDelete(
    userId: number,
    ids: number[],
    entityManager?: EntityManager,
  ) {
    const useEntity =
      entityManager.getRepository(UserRole) || this.userRoleRepository;

    const deteledUserRoles = await useEntity
      .createQueryBuilder('user_role')
      .softDelete()
      .where('user_id = :id', { id: userId })
      .andWhere('role_id IN (:...roles)', { roles: ids })
      .andWhere('deleted_at IS NULL')
      .returning(['id', 'role', 'user'])
      .execute();

    return deteledUserRoles;
  }
}
