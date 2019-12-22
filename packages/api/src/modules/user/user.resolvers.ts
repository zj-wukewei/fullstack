import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User, UsersPagination, AuthUser } from '@users/common/src/models';
import { NewUserInput, UpdateUserInfo } from '@users/common/src/dto';

import { User as UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { AuthRolesGuard, GqlAuthGuard, CurrentUser, Permissions } from '../../common/auth';
import BasePageArgs from '../../common/page/base-page-args';
import { userUtil } from '../../utils';
import { Pagination } from '../../common/page';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly userService: UserService) {}

  @Query(() => UsersPagination)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_SELECT')
  async users(@Args() args: BasePageArgs): Promise<Pagination<UserEntity>> {
    return this.userService.users(args);
  }

  @Query(() => User)
  async user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<UserEntity | undefined> {
    return this.userService.findOneById(id);
  }

  @Query(() => AuthUser)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: AuthUser): Promise<AuthUser> {
    const userEntity = await this.userService.findOneByPhone(user.phone);
    return userUtil.userTramsforAuthUser(userEntity);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_CREATE')
  async createUser(@Args('newUserData') newUserData: NewUserInput): Promise<UserEntity> {
    const createdUser = await this.userService.create(newUserData);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUserInfo(
    @CurrentUser() current: AuthUser,
    @Args('updateUserInfo') info: UpdateUserInfo,
  ): Promise<UserEntity> {
    return this.userService.updateUserInfo(current, info);
  }

  @Subscription(() => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
