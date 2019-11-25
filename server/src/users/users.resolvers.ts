import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './models/user';
import { User as UserEntity } from './users.entity';
import { NewUserInput } from './dto/new-user.input';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '../auth/gql.auth.guard';

import { DeepPartialTransform } from '../pipeTransform/DeepPartialTransform';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [User])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(returns => User)
  async user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }

  @Mutation(returns => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.phone = newUserData.phone;
    userEntity.password = '123456';
    userEntity.createDate = new Date();
    const createdUser = await this.usersService.create(userEntity);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription(returns => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
