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
      .select(['user.id', 'user.email', 'user.created_at', 'user.updated_at'])
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
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);

      const _user = await this.findUserById(id);

      if (updateUserDto.email) {
        const existingUser = await userRepository.findOne({
          where: { email: updateUserDto.email },
        });

        if (existingUser && existingUser.id !== id)
          throw new ConflictException(
            `El correo ${updateUserDto.email} ya existe.`,
          );
      }

      const fieldsToUpdate: Partial<User> = {};

      if (updateUserDto.email) fieldsToUpdate.email = updateUserDto.email;
      if (updateUserDto.first_name)
        fieldsToUpdate.person.first_name = updateUserDto.first_name;
      if (updateUserDto.middle_name)
        fieldsToUpdate.person.middle_name = updateUserDto.middle_name;
      if (updateUserDto.last_name)
        fieldsToUpdate.person.last_name = updateUserDto.last_name;
      if (updateUserDto.last_name)
        fieldsToUpdate.person.last_name = updateUserDto.last_name;

      const userCreate = userRepository.create(fieldsToUpdate);

      return userCreate;
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
