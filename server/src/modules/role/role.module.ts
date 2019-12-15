import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleResolver } from './role.resolvers';
import { RoleService } from './role.service';
import { CustomRoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomRoleRepository])],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
