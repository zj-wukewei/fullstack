import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../graphql.schema';
import { User as UserEntity } from './users.entity';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';

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
  async create(@Args('createUserInput') args: User): Promise<UserEntity> {
    const { phone, appModel, appType } = args;
    const userEntity = new UserEntity();
    userEntity.phone = phone;
    userEntity.appModel = appModel;
    userEntity.appType = appType;
    const createdUser = await this.usersService.create(userEntity);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
