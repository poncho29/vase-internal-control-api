import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto';

import { validateErrors } from '../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: createUserDto.role },
      });

      if (!role)
        throw new NotFoundException(
          `El rol con ID ${createUserDto.role} no existe`,
        );

      if (!role.is_active)
        throw new BadRequestException(`El rol ${role.role_name} está inactivo`);

      const user = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
        role,
        is_active: createUserDto.is_active ?? true,
      });

      const newUser = await this.userRepository.save(user);
      delete newUser.password;

      return {
        user: newUser,
        message: 'Usuario creado correctamente',
      };
    } catch (error) {
      validateErrors(error, 'un usuario', 'email');
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const findOptions: FindManyOptions<User> = {
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
      relations: {
        role: true,
        company: true,
      },
    };

    const [users, total] = await this.userRepository.findAndCount(findOptions);

    return { users, total };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        role: {
          permissions: true,
        },
        company: true,
      },
    });

    if (!user)
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      if (updateUserDto.role) {
        const role = await this.roleRepository.findOne({
          where: { id: updateUserDto.role },
        });

        if (!role) {
          throw new NotFoundException(
            `El rol con ID ${updateUserDto.role} no existe`,
          );
        }

        if (!role.is_active) {
          throw new BadRequestException(
            `El rol ${role.role_name} está inactivo`,
          );
        }

        user.role = role;
      }

      Object.assign(user, {
        ...updateUserDto,
        ...(updateUserDto.password && {
          password: bcrypt.hashSync(updateUserDto.password, 10),
        }),
      });

      const updatedUser = await this.userRepository.save(user);
      delete updatedUser.password;

      return {
        user: updatedUser,
        message: 'Usuario actualizado correctamente',
      };
    } catch (error) {
      validateErrors(error, 'el usuario', 'email');
    }
  }
}
