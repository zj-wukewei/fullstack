import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './models/user';
import { User as UserEntity } from './entity/user.entity';
import { AuthUser } from '../auth/models/auth-user';
import { NewUserInput } from './dto/new-user.input';
import { UserService } from './user.service';
import { AuthRolesGuard } from '../../common/auth/auth-guard';
import { GqlAuthGuard } from '../../common/auth/gql.auth.guard';
import { CurrentUser } from '../../common/auth/create.param.decorator';
import BasePageArgs from '../../common/page/base-page-args';
import { UserPageInfo } from './models/user-page';
import { Permissions } from '../../common/auth/permissions-decorators';
import { UpdateUserInfo } from './dto/update-user-info-input';
import { UserInfo } from './entity/user.info.entity';
import { userTramsforAuthUser } from '../../utils/user.utils';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolvers {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(returns => UserPageInfo)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_SELECT')
  async usersPage(@Args() args: BasePageArgs): Promise<UserPageInfo> {
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
    return userTramsforAuthUser(userEntity);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_CREATE')
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<UserEntity> {
    const createdUser = await this.userService.create(newUserData);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async updateUserInfo(@CurrentUser() current: AuthUser, @Args('updateUserInfo') info: UpdateUserInfo): Promise<UserEntity> {
    const user = new UserEntity();
    user.id = current.id;
    const updateInfo = Object.assign(new UserInfo(), info);
    if (current.info) {
      //有就是更新
      updateInfo.id = current.info.id;
    }
    updateInfo.createDate = new Date();
    return await this.userService.updateUserInfo(user, updateInfo);
  }

  @Subscription(returns => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
