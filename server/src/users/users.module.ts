import { Module } from '@nestjs/common';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}
