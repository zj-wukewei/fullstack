import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { CustomUserRepository } from './repository/users.repository';
import { CustomRoleRepository } from './repository/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomUserRepository, CustomRoleRepository])],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UsersModule {}
