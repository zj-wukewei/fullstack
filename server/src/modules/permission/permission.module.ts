import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionResolver } from './permission.resolvers';
import { PermissionService } from './permission.service';
import { CustomPermissionRepository } from './permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomPermissionRepository])],
  providers: [PermissionService, PermissionResolver],
  exports: [PermissionService],
})
export class PermissionModule {}
