import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DataSource, Repository } from 'typeorm';
import { Response } from 'express';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Role } from '../entities/role.entity';

import { unaccent } from '@/common/utils/unaccent';
import { PaginationHelper } from '@/common/helpers/pagination-helper';

import { RolePermissionService } from './role-permission.service';
import { PermissionService } from './permission.service';

import { RoleListItemSchema } from '../schemas/role-list-item.schema';

import { CreateRoleDto } from '../dto/create-role.dto';
import { FilterRoleDto } from '../dto/filter-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly rolePermissionService: RolePermissionService,
    private readonly permissionService: PermissionService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    filterRoleDto: FilterRoleDto,
    res: Response,
  ): Promise<RoleListItemSchema[]> {
    const selectQuery = this.roleRepository.createQueryBuilder('role');

    if (filterRoleDto.search) {
      const searchNormalized = unaccent(filterRoleDto.search);

      selectQuery.andWhere(
        new Brackets((qb) => {
          qb.where('unaccent(role.name) ILIKE :filtro', {
            filtro: `%${searchNormalized}%`,
          });
        }),
      );
    }

    selectQuery
      .leftJoinAndSelect('role.role_permission', 'role_permission')
      .leftJoinAndSelect('role_permission.permission', 'permission')
      .andWhere('role.name != :excludedRoleName', {
        excludedRoleName: 'SuperAdmin',
      });

    if (filterRoleDto.pagination) {
      PaginationHelper.paginate(
        selectQuery,
        filterRoleDto.page,
        filterRoleDto.per_page,
      );
    }

    const [roles, count] = await selectQuery.getManyAndCount();

    if (filterRoleDto.pagination) {
      PaginationHelper.setHeaders(res, count, filterRoleDto);
    }

    const rolesDto = roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.role_permission.map((rolePermission) => ({
        id: rolePermission.permission.id,
        name: rolePermission.permission.name,
        description: rolePermission.permission.description,
        label: rolePermission.permission.label,
      })),
    }));

    return rolesDto;
  }

  async findById(id: number): Promise<Role> {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id', 'role.name', 'role.description'])
      .where('role.id = :id', { id })
      .getOne();

    if (!role) throw new NotFoundException('Rol no encontrado.');

    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { permission_id } = createRoleDto;

    for (const id of permission_id) await this.permissionService.findById(id);

    const existing = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
      withDeleted: true,
    });

    if (existing && !existing.deleted_at)
      throw new ConflictException('El rol con este nombre ya existe.');

    if (existing && existing.deleted_at)
      return await this.dataSource.transaction(async (manager) => {
        const restoreRole = await manager
          .getRepository(Role)
          .createQueryBuilder()
          .restore()
          .where('role.id = :id', { id: existing.id })
          .returning(['role.id', 'role.name', 'role.description'])
          .execute();

        await this.rolePermissionService.restoreRolePermission(
          manager,
          existing.id,
          createRoleDto.permission_id,
        );

        const getOneRole = restoreRole.raw as Role[];

        return getOneRole[0];
      });

    return await this.dataSource.transaction(async (manager) => {
      const createRole = manager.create(Role, createRoleDto);
      const role = await manager.save(Role, createRole);

      if (permission_id.length > 0)
        await this.rolePermissionService.createMulty(
          manager,
          role.id,
          permission_id,
        );

      return role;
    });
  }

  async delete(role_id: number): Promise<{
    success: boolean;
    message: string;
    deletedPermissions: number;
  }> {
    const existing = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.id = :id', { id: 2 })
      .getOne();

    if (!existing) throw new ConflictException('Este role no existe.');

    return await this.dataSource.transaction(async (manager) => {
      const deleteResult = await manager.softDelete(Role, role_id);

      const deletedPermissions =
        await this.rolePermissionService.softDeleteMulti(manager, role_id);

      if (deleteResult.affected === 0)
        throw new InternalServerErrorException('No se pudo eliminar el role.');

      return {
        success: true,
        message: `Role eliminado correctamente.`,
        deletedPermissions,
      };
    });
  }
}
