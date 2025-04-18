import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateRoleDto } from '../dto/create-role.dto';

import { Role } from '../entities/role.entity';

import { RolePermissionService } from './role-permission.service';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly rolePermissionService: RolePermissionService,
    private readonly permissionService: PermissionService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Role[]> {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id', 'role.name'])
      .getMany();

    return roles;
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
