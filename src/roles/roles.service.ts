import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, In, Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationDto } from '../common/dto';

import { validateErrors } from '../utils';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const permissions = await this.permissionsRepository.findBy({
        id: In(createRoleDto.permissions),
      });

      // Verificar si todos los permisos fueron encontrados
      if (permissions.length !== createRoleDto.permissions.length) {
        const foundIds = permissions.map((p) => p.id);
        const notFoundIds = createRoleDto.permissions.filter(
          (id) => !foundIds.includes(id),
        );
        throw new NotFoundException(
          `Los siguientes permisos no fueron encontrados: ${notFoundIds.join(', ')}`,
        );
      }

      // Verificar que todos los permisos estén activos
      const inactivePermissions = permissions.filter((p) => !p.is_active);
      if (inactivePermissions.length > 0) {
        throw new BadRequestException(
          `No se pueden asignar permisos inactivos: ${inactivePermissions.map((p) => p.permission_name).join(', ')}`,
        );
      }

      const role = this.rolesRepository.create({
        role_name: createRoleDto.role_name,
        is_active: createRoleDto.is_active ?? true,
        permissions,
      });

      const newRole = await this.rolesRepository.save(role);

      return { role: newRole, message: 'Role creado correctamente' };
    } catch (error) {
      validateErrors(error, 'un role');
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const findOptions: FindManyOptions<Role> = {
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    };

    const [roles, total] = await this.rolesRepository.findAndCount(findOptions);

    return { roles, total };
  }

  async findOne(id: string) {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: {
        permissions: true,
      },
    });

    if (!role) throw new NotFoundException(`Role con ID ${id} no encontrado`);

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.findOne(id);

      if (updateRoleDto.role_name) {
        role.role_name = updateRoleDto.role_name;
      }

      if (typeof updateRoleDto.is_active !== 'undefined') {
        role.is_active = updateRoleDto.is_active;
      }

      // Si se proporcionan nuevos permisos
      if (updateRoleDto.permissions?.length > 0) {
        const permissions = await this.permissionsRepository.findBy({
          id: In(updateRoleDto.permissions),
        });

        // Verificar que existan todos los permisos
        if (permissions.length !== updateRoleDto.permissions.length) {
          const foundIds = permissions.map((p) => p.id);
          const notFoundIds = updateRoleDto.permissions.filter(
            (id) => !foundIds.includes(id),
          );
          throw new NotFoundException(
            `Los siguientes permisos no fueron encontrados: ${notFoundIds.join(', ')}`,
          );
        }

        // Verificar que los permisos estén activos
        const inactivePermissions = permissions.filter((p) => !p.is_active);
        if (inactivePermissions.length > 0) {
          throw new BadRequestException(
            `No se pueden asignar permisos inactivos: ${inactivePermissions.map((p) => p.permission_name).join(', ')}`,
          );
        }

        role.permissions = permissions;
      }

      const updatedRole = await this.rolesRepository.save(role);

      return { role: updatedRole, message: 'Role actualizado correctamente' };
    } catch (error) {
      validateErrors(error, 'un role');
    }
  }
}
