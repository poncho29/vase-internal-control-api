import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, FindManyOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from '../common/dto';

import { validateErrors } from '../utils';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const { admin_user, ...companyData } = createCompanyDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear la compañía
      const company = this.companyRepository.create(companyData);
      await queryRunner.manager.save(company);

      // Obtener el role
      const role = await this.roleRepository.findOneByOrFail({
        id: admin_user.role,
      });

      if (role.role_name.toLowerCase() !== 'admin') {
        throw new BadRequestException(
          'El usuario debe tener rol de administrador para crear una compañía',
        );
      }

      // Crear el usuario administrador
      const user = this.userRepository.create({
        ...admin_user,
        password: bcrypt.hashSync(admin_user.password, 10),
        role,
        company,
      });
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return {
        company,
        message: 'Companía creada correctamente',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.table === 'users') {
        validateErrors(error, 'un usuario', 'email');
      } else {
        validateErrors(error, 'una companía', 'email');
      }
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const findOptions: FindManyOptions<Company> = {
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    };

    const [companies, total] =
      await this.companyRepository.findAndCount(findOptions);

    return { companies, total };
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: {
        users: {
          role: {
            permissions: true,
          },
        },
      },
    });

    if (!company)
      throw new NotFoundException(`Empresa con ID ${id} no encontrado`);

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    try {
      Object.assign(company, updateCompanyDto);

      const updatedCompany = await this.companyRepository.save(company);

      return {
        company: updatedCompany,
        message: 'Compañía actualizada correctamente',
      };
    } catch (error) {
      validateErrors(error, 'una compañía', 'email');
    }
  }
}
