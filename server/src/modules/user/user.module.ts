import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolvers } from './user.resolvers';
import { UserService } from './user.service';
import { CustomUserRepository } from './user.repository';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomUserRepository]), RoleModule],
  providers: [UserService, UsersResolvers],
  exports: [UserService],
})
export class UserModule {}
