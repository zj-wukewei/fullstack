import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleResolver } from './role.resolvers';
import { RoleService } from './role.service';
import { CustomRoleRepository } from './role.repository';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomRoleRepository]), PermissionModule],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
