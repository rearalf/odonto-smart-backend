import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserPermissionService } from 'src/user-permission/user-permission.service';
import { PermissionService } from '../permission/permission.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { PersonService } from 'src/person/person.service';
import { RoleService } from '../role/role.service';

import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from './entities/user.entity';

import { UpdatePersonDto } from 'src/person/dto/update-person.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userPermissionService: UserPermissionService,
    private readonly permissionService: PermissionService,
    private readonly userRoleService: UserRoleService,
    private readonly personService: PersonService,
    private readonly roleService: RoleService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.dataSource.transaction(async (entityManager) => {
        const userRepository = entityManager.getRepository(User);

        const { person } = await this.personService.create(
          createUserDto,
          entityManager,
        );

        const validationEmail = await userRepository.findBy({
          email: createUserDto.email,
        });

        if (validationEmail.length > 0) {
          throw new ConflictException(
            `El correo ${createUserDto.email} esta duplicado.`,
          );
        }

        const createUser = userRepository.create({
          password: createUserDto.password,
          email: createUserDto.email,
          person,
        });

        const saved = await userRepository.save(createUser);

        const roles: Role[] = [];

        for (const roleId of createUserDto.role) {
          const role = await this.roleService.findRoleById(roleId);

          const createdUserRole = await this.userRoleService.create(
            role,
            saved,
            entityManager,
          );

          roles.push(createdUserRole.role);
        }

        const permissions: Permission[] = [];

        for (const permissionId of createUserDto.permission) {
          const permission =
            await this.permissionService.findById(permissionId);

          const savedRelation = await this.userPermissionService.create(
            saved,
            permission,
            entityManager,
          );

          permissions.push(savedRelation.permission);
        }

        return {
          id: saved.id,
          email: saved.email,
          person_id: saved.person.id,
          first_name: saved.person.first_name,
          middle_name: saved.person.middle_name,
          last_name: saved.person.last_name,
          person_type_id: saved.person.personType.id,
          person_type_name: saved.person.personType.name,
          roles: roles,
          permissions: permissions,
        };
      });
    } catch (error) {
      throw (
        error || new InternalServerErrorException('Error en la transacción')
      );
    }
  }

  async findUserById(id: number) {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect('user.permission', 'userPermission')
      .leftJoinAndSelect('userPermission.permission', 'permission')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('person.personType', 'personType')
      .leftJoinAndSelect('person.specialty', 'personSpecialty')
      .leftJoinAndSelect('personSpecialty.specialty', 'specialty')
      .select(['user.id', 'user.email', 'user.created_at', 'user.updated_at'])
      .addSelect([
        'person.id',
        'person.first_name',
        'person.middle_name',
        'person.last_name',
      ])
      .addSelect(['personType.id', 'personType.name'])
      .addSelect([
        'personSpecialty.id',
        'specialty.id',
        'specialty.name',
        'specialty.description',
      ])
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

    if (!user) throw new NotFoundException(`Usuario no encontrado.`);

    const formatRole = user.role.map((r) => ({
      id: r.role.id,
      name: r.role.name,
      description: r.role.description,
    }));

    const formatPermission = user.permission.map((p) => ({
      id: p.permission.id,
      name: p.permission.name,
      description: p.permission.description,
    }));

    const formatSpecialty = user.person.specialty.map((s) => ({
      id: s.specialty.id,
      name: s.specialty.name,
      description: s.specialty.description,
    }));

    return {
      id: user.id,
      email: user.email,
      person_id: user.person.id,
      first_name: user.person.first_name,
      middle_name: user.person.middle_name,
      last_name: user.person.last_name,
      person_type_id: user.person.personType.id,
      person_type_name: user.person.personType.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: formatRole,
      permission: formatPermission,
      specialty: formatSpecialty,
    };
  }

  async findUsers() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('person.personType', 'personType')
      .leftJoinAndSelect('user.role', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect('user.permission', 'userPermission')
      .leftJoinAndSelect('userPermission.permission', 'permission')
      .select(['user.id', 'user.email'])
      .addSelect([
        'person.id',
        'person.first_name',
        'person.middle_name',
        'person.last_name',
        'personType.id',
        'personType.name',
      ])
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
      .andWhere('userPermission.deleted_at IS NULL')
      .andWhere('permission.deleted_at IS NULL')
      .getMany();

    const formattedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      person_id: user.person.id,
      first_name: user.person.first_name,
      middle_name: user.person.middle_name,
      last_name: user.person.last_name,
      person_type_name: user.person.personType.name,
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
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.dataSource.transaction(async (entityManager) => {
      const userRepository = entityManager.getRepository(User);

      const user = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .leftJoinAndSelect('user.permission', 'userPermission')
        .leftJoinAndSelect('userPermission.permission', 'permission')
        .leftJoinAndSelect('user.person', 'person')
        .where('user.id = :id', { id })
        .andWhere('user.deleted_at IS NULL')
        .getOne();

      if (!user) throw new NotFoundException(`Usuario no encontrada.`);

      const fieldsToPersonUpdate: UpdatePersonDto = {};

      if (updateUserDto.first_name)
        fieldsToPersonUpdate.first_name = updateUserDto.first_name;
      if (updateUserDto.middle_name)
        fieldsToPersonUpdate.middle_name = updateUserDto.middle_name;
      if (updateUserDto.last_name)
        fieldsToPersonUpdate.last_name = updateUserDto.last_name;
      if (updateUserDto.person_type)
        fieldsToPersonUpdate.person_type = updateUserDto.person_type;
      if (updateUserDto.specialty)
        fieldsToPersonUpdate.specialty = updateUserDto.specialty;

      const _updatedPerson = await this.personService.update(
        user.person.id,
        fieldsToPersonUpdate,
      );

      const rolesModified = {
        added: [] as Role[],
        removed: [] as Role[],
      };

      const permissionModified = {
        added: [] as Permission[],
        removed: [] as Permission[],
      };

      const currentRoleIds = user.role.map((userRole) => userRole.role.id);
      const currentPermissionIds = user.permission.map(
        (userPermission) => userPermission.permission.id,
      );

      if (updateUserDto.role) {
        if (updateUserDto.role.length > 0) {
          const rolesToAdd = [...new Set(updateUserDto.role)].filter(
            (id) => !currentRoleIds.includes(id),
          );

          for (const roleId of rolesToAdd) {
            const role = await this.roleService.findRoleById(roleId);

            const createdUserRole = await this.userRoleService.create(
              role,
              user,
              entityManager,
            );

            rolesModified.added.push(createdUserRole.role);
          }
        }

        let rolesToRemove: number[] = [];

        if (updateUserDto.role.length === 0) {
          rolesToRemove = currentRoleIds;
        } else {
          rolesToRemove = [...new Set(currentRoleIds)].filter(
            (id) => !updateUserDto.role.includes(id),
          );
        }

        if (rolesToRemove.length > 0) {
          const rolesToRemoveEntities =
            await this.roleService.findMultiUserRole(rolesToRemove);

          if (rolesToRemoveEntities.length > 0) {
            rolesModified.removed = rolesToRemoveEntities.map((role) => role);

            await this.userRoleService.multiDelete(
              user.id,
              rolesToRemove,
              entityManager,
            );
          }
        }
      }

      if (updateUserDto.permission) {
        if (updateUserDto.permission.length > 0) {
          const permissionsToAdd = [
            ...new Set(updateUserDto.permission),
          ].filter((id) => !currentPermissionIds.includes(id));

          for (const permissionId of permissionsToAdd) {
            const permission =
              await this.permissionService.findById(permissionId);

            const createdUserPermission =
              await this.userPermissionService.create(
                user,
                permission,
                entityManager,
              );

            permissionModified.added.push(createdUserPermission.permission);
          }
        }

        let permissionsToRemove: number[] = [];

        if (updateUserDto.permission.length === 0) {
          permissionsToRemove = currentPermissionIds;
        } else {
          permissionsToRemove = [...new Set(currentPermissionIds)].filter(
            (id) => !updateUserDto.permission.includes(id),
          );
        }

        if (permissionsToRemove.length > 0) {
          const permissionsToRemoveEntities =
            await this.permissionService.findMultiUserPermission(
              permissionsToRemove,
            );

          if (permissionsToRemoveEntities.length > 0) {
            permissionModified.removed = permissionsToRemoveEntities.map(
              (permission) => permission,
            );

            await this.userPermissionService.multiDelete(
              user.id,
              permissionsToRemove,
              entityManager,
            );
          }
        }
      }

      const updatedUser = await this.findUserById(id);

      return {
        ...updatedUser,
      };
    });
  }

  async deleteUser(_id: number) {
    /* return await this.dataSource.transaction(async (manage) => {
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
    }); */
  }
}
