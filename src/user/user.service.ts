import { DataSource, In } from 'typeorm';
import {
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserPermission } from 'src/user-permission/entities/user-permission.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);
      const roleRepository = manage.getRepository(Role);
      const permissionRepository = manage.getRepository(Permission);
      const pivotPermissionRepository = manage.getRepository(UserPermission);
      const pivotRoleRepository = manage.getRepository(UserRole);

      const validationEmail = await userRepository.findBy({
        email: createUserDto.email,
      });

      if (validationEmail.length > 0) {
        throw new ConflictException(
          `The email ${createUserDto.email} already exists`,
        );
      }

      const createUser = userRepository.create({
        password: createUserDto.password,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        name: createUserDto.name,
      });

      const newUser = await userRepository.save(createUser);

      const roles: Role[] = [];

      for (const roleId of createUserDto.role) {
        const role = await roleRepository
          .createQueryBuilder('role')
          .where('role.id = :id', { id: roleId })
          .select(['role.id', 'role.name', 'role.description'])
          .getOne();

        if (!role) {
          throw new NotFoundException(`Role with ID ${roleId} not found`);
        }

        const create = pivotRoleRepository.create({
          role,
          user: newUser,
        });
        const saved = await pivotRoleRepository.save(create);

        roles.push(saved.role);
      }

      const permissions: Permission[] = [];

      for (const permissionId of createUserDto.permission) {
        const permission = await permissionRepository
          .createQueryBuilder('permission')
          .where('permission.id=:id', { id: permissionId })
          .select([
            'permission.id',
            'permission.name',
            'permission.description',
          ])
          .getOne();

        if (!permission)
          throw new NotFoundException(
            `Permission with ID ${permissionId} not found`,
          );

        const create = pivotPermissionRepository.create({
          permission,
          user: newUser,
        });

        const saved = await pivotPermissionRepository.save(create);

        permissions.push(saved.permission);
      }

      return {
        roles,
        permissions,
        user: newUser,
      };
    });
  }

  async findUserById(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);

      const user = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .leftJoinAndSelect('user.permission', 'userPermission')
        .leftJoinAndSelect('userPermission.permission', 'permission')
        .select(['user.id', 'user.name', 'user.last_name', 'user.email'])
        .addSelect(['userRole.id', 'role.id', 'role.name', 'role.description'])
        .addSelect([
          'userPermission.id',
          'permission.id',
          'permission.name',
          'permission.name',
          'permission.description',
        ])
        .where('user.id = :id', { id })
        .andWhere('user.deleted_at IS NULL')
        .andWhere('userRole.deleted_at IS NULL')
        .andWhere('role.deleted_at IS NULL')
        .getOne();

      if (!user) throw new NotFoundException(`User not found`);

      return user;
    });
  }

  async findUsers() {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);

      const users = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .leftJoinAndSelect('user.permission', 'userPermission')
        .leftJoinAndSelect('userPermission.permission', 'permission')
        .select(['user.id', 'user.name', 'user.last_name', 'user.email'])
        .addSelect(['userRole.id', 'role.id', 'role.name', 'role.description'])
        .addSelect([
          'userPermission.id',
          'permission.id',
          'permission.name',
          'permission.description',
        ])
        .where('user.deleted_at IS NULL')
        .andWhere('userRole.deleted_at IS NULL')
        .andWhere('role.deleted_at IS NULL')
        .getMany();

      const formattedUsers = users.map((user) => ({
        ...user,
        role: user.role.map((r) => ({
          id: r.role.id,
          name: r.role.name,
          description: r.role.description,
        })),
        permission: user.permission.map((p) => ({
          id: p.permission.id,
          name: p.permission.name,
          description: p.permission.description,
        })),
      }));

      return formattedUsers;
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);
      const roleRepository = manage.getRepository(Role);
      const pivotRoleRepository = manage.getRepository(UserRole);
      const permissionRepository = manage.getRepository(Permission);
      const pivotPermissionRepository = manage.getRepository(UserPermission);

      const user = await this.findUserById(id);

      if (!user) throw new NotFoundException(`User not found`);

      if (updateUserDto.email) {
        const existingUser = await userRepository.findOne({
          where: { email: updateUserDto.email },
        });

        if (existingUser && existingUser.id !== id)
          throw new ConflictException(
            `The email ${updateUserDto.email} already exists`,
          );
      }

      const fieldsToUpdate: Partial<User> = {};
      if (updateUserDto.email) fieldsToUpdate.email = updateUserDto.email;
      if (updateUserDto.name) fieldsToUpdate.name = updateUserDto.name;
      if (updateUserDto.last_name)
        fieldsToUpdate.last_name = updateUserDto.last_name;

      const userCreate = userRepository.create(fieldsToUpdate);
      const updateUser = await userRepository.update({ id }, userCreate);

      const rolesModified = {
        added: [] as Role[],
        removed: [] as Role[],
      };

      const currentRoleIds = user.role.map((userRole) => userRole.role.id);

      if (updateUserDto.role) {
        if (updateUserDto.role.length > 0) {
          const rolesToAdd = updateUserDto.role.filter(
            (id) => !currentRoleIds.includes(id),
          );

          for (const roleId of rolesToAdd) {
            const role = await roleRepository.findOne({
              where: { id: roleId },
            });

            if (!role)
              throw new NotFoundException(`Role with ID ${role} not found`);

            const userRole = pivotRoleRepository.create({
              user,
              role,
            });

            const saved = await pivotRoleRepository.save(userRole);

            rolesModified.added.push(saved.role);
          }
        }

        let rolesToRemove: number[] = [];

        if (updateUserDto.role.length === 0) {
          rolesToRemove = currentRoleIds;
        } else {
          rolesToRemove = currentRoleIds.filter(
            (id) => !updateUserDto.role.includes(id),
          );
        }

        if (rolesToRemove.length > 0) {
          const rolesToRemoveEntities = await roleRepository
            .createQueryBuilder('role')
            .select(['role.id', 'role.name', 'role.description'])
            .where('role.id IN (:...roles)', { roles: rolesToRemove })
            .getMany();

          rolesModified.removed = rolesToRemoveEntities.map((role) => role);

          await pivotRoleRepository
            .createQueryBuilder('user_role')
            .softDelete()
            .where('user_id = :id', { id })
            .andWhere('role_id IN (:...roles)', { roles: rolesToRemove })
            .execute();
        }
      }

      const permissionModified = {
        added: [] as Permission[],
        removed: [] as Permission[],
      };

      const currentPermissionIds = user.permission.map(
        (userPermission) => userPermission.permission.id,
      );

      if (updateUserDto.permission) {
        if (updateUserDto.permission.length > 0) {
          const permissionsToAdd = updateUserDto.permission.filter(
            (id) => !currentPermissionIds.includes(id),
          );

          for (const permissionId of permissionsToAdd) {
            const permission = await permissionRepository.findOne({
              where: { id: permissionId },
            });

            if (!permission) throw new NotFoundException(`Role not found`);

            const create = pivotPermissionRepository.create({
              user,
              permission,
            });

            const saved = await pivotPermissionRepository.save(create);

            permissionModified.added.push(saved.permission);
          }
        }

        let permissionsToRemove: number[] = [];

        if (updateUserDto.permission.length === 0) {
          permissionsToRemove = user.permission.map(
            (userPermission) => userPermission.permission.id,
          );
        } else {
          permissionsToRemove = currentPermissionIds.filter(
            (id) => !updateUserDto.permission.includes(id),
          );
        }

        const permission = await permissionRepository.find({
          where: { id: In(permissionsToRemove) },
        });

        permissionModified.removed = permission.map((permission) => permission);

        if (permissionsToRemove.length > 0)
          await pivotPermissionRepository
            .createQueryBuilder('user_permission')
            .softDelete()
            .where('user_id = :id', { id })
            .andWhere('permission_id IN (:...permission)', {
              permission: permissionsToRemove,
            })
            .execute();
      }

      return {
        updateUser,
        rolesModified,
        permissionModified,
      };
    });
  }

  async deleteUser(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const pivotPermissionRepository = manage.getRepository(UserPermission);
      const pivotRoleRepository = manage.getRepository(UserRole);
      const userRespository = manage.getRepository(User);

      const user = await this.findUserById(id);
      if (!user) throw new NotFoundException(`User not found`);

      await userRespository.softDelete(id);

      const permissions = user.permission.map((permission) => permission);

      const permissionsDeleted: Permission[] = [];

      for (const permission of permissions) {
        await pivotPermissionRepository.softDelete(permission.id);
        permissionsDeleted.push(permission.permission);
      }

      const roles = user.role.map((role) => role);
      const rolesDeleted: Role[] = [];

      for (const role of roles) {
        await pivotRoleRepository.softDelete(role.id);
        rolesDeleted.push(role.role);
      }

      return {
        user,
        role: rolesDeleted,
        permission: permissionsDeleted,
      };
    });
  }
}
