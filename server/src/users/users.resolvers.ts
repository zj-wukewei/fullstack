import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './users.entity';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';

import { DeepPartialTransform } from '../pipeTransform/DeepPartialTransform';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(UsersGuard)
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Mutation('createUser')
  async create(@Args({ name: 'createUserInput', type: () => new User() }, DeepPartialTransform) user: User): Promise<User> {
    const createdUser = await this.usersService.create(user);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
