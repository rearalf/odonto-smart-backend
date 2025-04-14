import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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

    if (!role) throw new NotFoundException('Role no encontrado.');

    return role;
  }
}
