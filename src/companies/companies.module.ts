import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User, Role])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
