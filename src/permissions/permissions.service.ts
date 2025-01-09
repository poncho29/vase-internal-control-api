import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, Repository } from 'typeorm';

import { Permission } from './entities/permission.entity';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PaginationDto } from '../common/dto';

import { validateErrors } from '../utils';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission =
        await this.permissionRepository.save(createPermissionDto);

      return {
        permission,
        message: `Permiso creado correctamente`,
      };
    } catch (error) {
      validateErrors(error, 'un permiso');
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const findOptions: FindManyOptions<Permission> = {
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    };

    const [permissions, total] =
      await this.permissionRepository.findAndCount(findOptions);

    return { permissions, total };
  }

  async findOne(id: string) {
    const permission = await this.permissionRepository.findOne({
      where: { id, is_active: true },
    });

    if (!permission)
      throw new BadRequestException(`Permission #${id} not found`);

    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      const permission = await this.permissionRepository.preload({
        id,
        ...updatePermissionDto,
      });

      if (!permission)
        throw new BadRequestException(`Permission #${id} not found`);

      return await this.permissionRepository.save(permission);
    } catch (error) {
      validateErrors(error, 'un permiso');
    }
  }

  async removeAllPermissions() {
    const query = this.permissionRepository.createQueryBuilder('permission');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      validateErrors(error);
    }
  }
}
