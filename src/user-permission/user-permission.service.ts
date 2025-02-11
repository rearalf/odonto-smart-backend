import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { Permission } from 'src/permission/entities/permission.entity';
import { UserPermission } from './entities/user-permission.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {}

  async create(
    user: User,
    permission: Permission,
    entityManager?: EntityManager,
  ) {
    const useEntity =
      entityManager.getRepository(UserPermission) ||
      this.userPermissionRepository;

    const validationRelation = await this.findByIdUserAndPermission(
      user.id,
      permission.id,
    );

    if (validationRelation !== null)
      throw new BadRequestException('Este usuario ya tiene este rol asignado.');

    const created = useEntity.create({
      permission,
      user,
    });

    const saved = await useEntity.save(created);

    return saved;
  }

  async findByIdUserAndPermission(user_id: number, permission_id: number) {
    const userPermission = await this.userPermissionRepository
      .createQueryBuilder('user_permission')
      .where('user_permission.user_id = :user_id', { user_id })
      .andWhere('user_permission.permission_id = :permission_id', {
        permission_id,
      })
      .getOne();

    return userPermission;
  }
}
