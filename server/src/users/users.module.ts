import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { CustomUserRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomUserRepository])],
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}
