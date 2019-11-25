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

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    const users: UserEntity[] = await this.usersService.findAll();
    return users.map(item => Object.assign(new User(), item)) ;
  }

  @Query(returns => [User])
  async user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    const user = await this.usersService.findOneById(id);
    return Object.assign(new User, user);
  }

  @Mutation(returns => User)
  async create(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    const createdUserEntity: UserEntity = await this.usersService.create(newUserData);
    const createdUser =  Object.assign(new User, createdUserEntity)
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription(returns => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
