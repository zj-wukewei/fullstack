import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { CustomUserRepository } from './repository/users.repository';
import { CustomRoleRepository } from './repository/roles.repository';
import { CustomUserInfoRepository } from './repository/user-Info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomUserRepository, CustomRoleRepository, CustomUserInfoRepository])],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UsersModule {}
