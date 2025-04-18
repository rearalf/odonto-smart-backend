import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    const permissions = await this.permissionRepository
      .createQueryBuilder('permission')
      .select(['permission.id', 'permission.name', 'permission.description'])
      .getMany();

    return permissions;
  }

  async findById(id: number): Promise<Permission> {
    const permission = await this.permissionRepository
      .createQueryBuilder('permission')
      .select(['permission.id', 'permission.name', 'permission.description'])
      .where('permission.id = :id', { id })
      .getOne();

    if (!permission) throw new NotFoundException('Permiso no encontrado.');

    return permission;
  }
}
