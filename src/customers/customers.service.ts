import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Customer } from './entities/customer.entity';
import { Company } from '../companies/entities/company.entity';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const company = await this.companyRepository.findOne({
      where: { id: createCustomerDto.company_id },
    });

    if (!company)
      throw new NotFoundException(
        `La empresa con ID ${createCustomerDto.company_id} no existe`,
      );

    if (!company.is_active)
      throw new BadRequestException(
        `La empresa ${company.company_name} está inactiva`,
      );

    const customer = this.customersRepository.create({
      ...createCustomerDto,
      company,
    });

    const newCustomer = await this.customersRepository.save(customer);

    return { customer: newCustomer, message: 'Cliente creado correctamente' };
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
