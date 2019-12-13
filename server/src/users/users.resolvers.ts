import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './models/user';
import { User as UserEntity } from './entity/user.entity';
import { AuthUser } from '../auth/models/auth-user';
import { NewUserInput } from './dto/new-user.input';
import { UsersService } from './users.service';
import { AuthRolesGuard } from '../common/auth/auth-guard';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { CurrentUser } from '../auth/create.param.decorator';
import BasePageArgs from '../common/page/base-page-args';
import { UserPageInfo } from './models/user-page';
import { Permissions } from '../common/auth/permissions-decorators';
import { UpdateUserInfo } from './dto/update-user-info-input';
import { UserInfo } from './entity/user.info.entity';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(returns => UserPageInfo)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('USER_SELECT')
  async usersPage(@Args() args: BasePageArgs): Promise<UserPageInfo> {
    return await this.usersService.users(args);
  }

  @Query(returns => User)
  async user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }

  @Query(returns => AuthUser)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: AuthUser): Promise<AuthUser> {
    const userEntity = await this.usersService.findOneByPhone(user.phone);
    const roles = userEntity.roles.map(item => item.name);
    const permission = userEntity.roles.map(item => item.permissions && item.permissions.map(p => p.name) || '' ).filter(item => item !== '').join(',').split(',');
    return Object.assign(new AuthUser(), userEntity, { roles, permission });
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
    return await this.usersService.updateUserInfo(user, updateInfo);
  }
  

  @Subscription(returns => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
