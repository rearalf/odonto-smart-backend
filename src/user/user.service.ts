import { DataSource, In } from 'typeorm';
import {
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { UserRole } from 'src/user-role/entities/user-role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/role/entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);
      const roleRepository = manage.getRepository(Role);
      const userRoleRepository = manage.getRepository(UserRole);

      const roles: Role[] = [];

      for (const roleId of createUserDto.role) {
        const role = await roleRepository
          .createQueryBuilder('role')
          .where('role.id = :id', { id: roleId })
          .select(['role.id', 'role.name', 'role.description'])
          .getOne();

        if (!role) {
          throw new NotFoundException(
            `Role with ID ${createUserDto.role} not found`,
          );
        }

        roles.push(role);
      }

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

      const userSaved = await userRepository.save(createUser);

      const userRole: Role[] = [];

      for (const role of roles) {
        const userRoleCreate = userRoleRepository.create({
          role,
          user: userSaved,
        });
        const userRoleSaved = await userRoleRepository.save(userRoleCreate);
        userRole.push(userRoleSaved.role);
      }

      return {
        userSaved,
        userRole,
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

      return user;
    });
  }

  async findUsers() {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);

      const user = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .leftJoinAndSelect('user.permission', 'userPermission')
        .leftJoinAndSelect('userPermission.permission', 'permission')
        .select(['user.id', 'user.name', 'user.last_name'])
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

      return user;
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);
      const userRoleRepository = manage.getRepository(UserRole);
      const roleRepository = manage.getRepository(Role);

      const user = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .where('user.id = :id', { id })
        .andWhere('user.deleted_at IS NULL')
        .andWhere('role.deleted_at IS NULL')
        .getOne();

      if (!user) throw new NotFoundException(`User with ID ${id} not found`);

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

      const currentRoleIds = user.role.map((userRole) => userRole.role.id);

      const rolesModified = {
        added: [] as string[],
        removed: [] as string[],
      };
      if (updateUserDto.role.length > 0) {
        const rolesToRemove = currentRoleIds.filter(
          (id) => !updateUserDto.role.includes(id),
        );

        const rolesToAdd = updateUserDto.role.filter(
          (id) => !currentRoleIds.includes(id),
        );

        for (const roleId of rolesToAdd) {
          const role = await roleRepository.findOne({ where: { id: roleId } });

          if (!role)
            throw new NotFoundException(`Role with ID ${role} not found`);

          const userRole = userRoleRepository.create({
            user,
            role,
          });

          const saved = await userRoleRepository.save(userRole);

          rolesModified.added.push(saved.role.name);
        }

        if (rolesToRemove.length > 0) {
          const rolesToRemoveEntities = await roleRepository.find({
            where: { id: In(rolesToRemove) },
          });

          rolesModified.removed = rolesToRemoveEntities.map(
            (role) => role.name,
          );

          await userRoleRepository
            .createQueryBuilder('user_role')
            .softDelete()
            .where('user_id = :id', { id })
            .andWhere('role_id IN (:...roles)', { roles: rolesToRemove })
            .execute();
        }
      }

      return {
        updateUser,
        rolesModified,
      };
    });
  }

  async deleteUser(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const userRespository = manage.getRepository(User);

      const user = await this.findUserById(id);
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);

      const userDeleted = await userRespository.softDelete(id);

      return {
        userDeleted,
      };
    });
  }
}
