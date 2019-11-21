import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { User } from './users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}
