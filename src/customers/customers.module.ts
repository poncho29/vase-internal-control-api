import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { Company } from '../companies/entities/company.entity';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Company])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
