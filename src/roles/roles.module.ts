import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

import { RolesService } from './roles.service';

import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), Permission],
  exports: [RolesService],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
