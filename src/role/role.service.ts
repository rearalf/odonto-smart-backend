import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from './entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.dataSource.transaction(async (manage) => {
      const roleRepository = manage.getRepository(Role);
      const rolePermissionRepository = manage.getRepository(RolePermission);
      const permissionRepository = manage.getRepository(Permission);

      const permissions: Permission[] = [];

      for (const permissionId of createRoleDto.permission) {
        const permission = await permissionRepository
          .createQueryBuilder('permission')
          .where('permission.id = :id', { id: permissionId })
          .select([
            'permission.id',
            'permission.name',
            'permission.description',
          ])
          .getOne();

        if (!permission)
          throw new NotFoundException(
            `Permission with ID ${createRoleDto.permission} not found`,
          );

        permissions.push(permission);
      }

      const createRole = roleRepository.create({
        name: createRoleDto.name,
        description: createRoleDto.description,
      });

      const roleSaved = await roleRepository.save(createRole);

      const rolePermission: Permission[] = [];

      for (const permission of permissions) {
        const permissionCreate = rolePermissionRepository.create({
          permission,
          role: roleSaved,
        });

        const permissionSaved =
          await rolePermissionRepository.save(permissionCreate);

        rolePermission.push(permissionSaved.permission);
      }

      return {
        roleSaved,
        rolePermission,
      };
    });
  }

  async findRoleById(id: number) {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permission', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .select(['role.id', 'role.name', 'role.description'])
      .addSelect([
        'rolePermission.id',
        'permission.id',
        'permission.name',
        'permission.description',
      ])
      .where('role.id = :id', { id })
      .andWhere('role.deleted_at IS NULL')
      .andWhere('rolePermission.deleted_at IS NULL')
      .andWhere('permission.deleted_at IS NULL')
      .getOne();

    if (!role) throw new NotFoundException('Rol no encontrado');

    return role;
  }

  async findRoles() {
    return await this.dataSource.transaction(async (manage) => {
      const roleRepository = manage.getRepository(Role);

      const roles = await roleRepository
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.permission', 'rolePermission')
        .leftJoinAndSelect('rolePermission.permission', 'permission')
        .select(['role.id', 'role.name', 'role.description'])
        .addSelect([
          'rolePermission.id',
          'permission.id',
          'permission.name',
          'permission.description',
        ])
        .andWhere('role.deleted_at IS NULL')
        .andWhere('rolePermission.deleted_at IS NULL')
        .andWhere('permission.deleted_at IS NULL')
        .getMany();

      return roles;
    });
  }

  async findMultiUserRole(ids: number[]) {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id', 'role.name', 'role.description'])
      .where('role.id IN (:...roles)', { roles: ids })
      .getMany();

    return roles;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.dataSource.transaction(async (manage) => {
      const roleRepository = manage.getRepository(Role);
      const permissionRepository = manage.getRepository(Permission);
      const rolePermissionRepository = manage.getRepository(RolePermission);

      const role = await this.findRoleById(id);

      if (!role) throw new NotFoundException(`Role with ID ${id} not found`);

      const fieldsToUpdate: Partial<Role> = {};
      if (updateRoleDto.name) fieldsToUpdate.name = updateRoleDto.name;
      if (updateRoleDto.description)
        fieldsToUpdate.description = updateRoleDto.description;

      const roleCreate = roleRepository.create(fieldsToUpdate);
      const updateRole = await roleRepository.update({ id }, roleCreate);

      const currentPermissionIds = role.permission.map(
        (rolePermission) => rolePermission.permission.id,
      );

      const permissionsModified = {
        added: [] as Permission[],
        removerd: [] as Permission[],
      };

      if (updateRoleDto.permission) {
        if (updateRoleDto.permission.length > 0) {
          const permissionsToAdd = updateRoleDto.permission.filter(
            (id) => !currentPermissionIds.includes(id),
          );

          for (const permissionId of permissionsToAdd) {
            const permission = await permissionRepository.findOne({
              where: { id: permissionId },
            });

            if (!permission)
              throw new NotFoundException(`Permission with ID ${id} not found`);

            const rolePermission = rolePermissionRepository.create({
              role,
              permission,
            });

            const saved = await rolePermissionRepository.save(rolePermission);

            permissionsModified.added.push(saved.permission);
          }
        }

        let permissionsToRemove: number[] = [];

        if (updateRoleDto.permission.length === 0) {
          permissionsToRemove = role.permission.map(
            (rolePermission) => rolePermission.permission.id,
          );
        } else {
          permissionsToRemove = currentPermissionIds.filter(
            (id) => !updateRoleDto.permission.includes(id),
          );
        }

        const permissionToRemoveEnttites = await permissionRepository.find({
          where: { id: In(permissionsToRemove) },
        });

        permissionsModified.removerd = permissionToRemoveEnttites.map(
          (permission) => permission,
        );

        if (permissionsToRemove.length > 0)
          await rolePermissionRepository
            .createQueryBuilder('role_permission')
            .softDelete()
            .where('role_id = :id', { id })
            .andWhere('permission_id IN (:...permissions)', {
              permissions: permissionsToRemove,
            })
            .execute();
      }

      return {
        role: updateRole,
        permissions: permissionsModified,
      };
    });
  }

  async deleteRole(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const roleRepository = manage.getRepository(Role);
      const pivotRepository = manage.getRepository(RolePermission);

      const role = await this.findRoleById(id);
      if (!role) throw new NotFoundException(`Role with ID ${id} not found`);

      await roleRepository.softDelete(id);

      const permissions = role.permission.map((permission) => permission);

      const permissionsDeleted: Permission[] = [];

      for (const pivot of permissions) {
        await pivotRepository.softDelete(pivot.permission);
        permissionsDeleted.push(pivot.permission);
      }

      return {
        role,
        permissionsDeleted,
      };
    });
  }
}
