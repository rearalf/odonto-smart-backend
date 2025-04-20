import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserPermission } from '../entities/user-permission.entity';

import { PermissionService } from './permission.service';

@Injectable()
export class UserPermissionServices {
  constructor(private readonly permissionService: PermissionService) {}

  async create(
    manager: EntityManager,
    user_id: number,
    permission_ids: number[],
  ): Promise<UserPermission[]> {
    const saved: UserPermission[] = [];

    for (const permission_id of permission_ids) {
      await this.permissionService.findById(permission_id);

      const createUserRole = manager.create(UserPermission, {
        permission_id,
        user_id,
      });

      const saveUserPermission = await manager.save(
        UserPermission,
        createUserRole,
      );

      saved.push(saveUserPermission);
    }

    return saved;
  }
}
