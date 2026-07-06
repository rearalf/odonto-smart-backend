import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserRole } from '../entities/user-role.entity';
import { Role } from '../entities/role.entity';

import { RoleService } from './role.service';

@Injectable()
export class UserRoleService {
  constructor(private readonly roleService: RoleService) {}

  async create(
    manager: EntityManager,
    user_id: number,
    role_ids: number[],
  ): Promise<UserRole[]> {
    const saved: UserRole[] = [];

    for (const role_id of role_ids) {
      const role = await manager.findOne(Role, { where: { id: role_id } });
      if (!role)
        throw new NotFoundException(`El rol con ID #${role_id} no existe.`);

      const createUserRole = manager.create(UserRole, {
        role_id,
        user_id,
      });

      const saveUserRole = await manager.save(UserRole, createUserRole);

      saved.push(saveUserRole);
    }

    return saved;
  }
}
