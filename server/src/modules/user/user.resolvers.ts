import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User, UsersPagination } from './models';
import { User as UserEntity } from './entity/user.entity';
import { AuthUser } from '../auth/models/auth-user';
import { NewUserInput, UpdateUserInfo } from './dto';
import { UserService } from './user.service';
import { AuthRolesGuard, GqlAuthGuard, CurrentUser, Permissions } from '../../common/auth';
import BasePageArgs from '../../common/page/base-page-args';
import { userUtil } from '../../utils/';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolvers {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(returns => UsersPagination)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_SELECT')
  async usersPage(@Args() args: BasePageArgs): Promise<UsersPagination> {
    return await this.userService.users(args);
  }

  @Query(returns => User)
  async user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<UserEntity> {
    return await this.userService.findOneById(id);
  }

  @Query(returns => AuthUser)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: AuthUser): Promise<AuthUser> {
    const userEntity = await this.userService.findOneByPhone(user.phone);
    return userUtil.userTramsforAuthUser(userEntity);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_CREATE')
  async createUser(@Args('newUserData') newUserData: NewUserInput): Promise<UserEntity> {
    const createdUser = await this.userService.create(newUserData);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async updateUserInfo(
    @CurrentUser() current: AuthUser,
    @Args('updateUserInfo') info: UpdateUserInfo,
  ): Promise<UserEntity> {
    return await this.userService.updateUserInfo(current, info);
  }

  @Subscription(returns => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
