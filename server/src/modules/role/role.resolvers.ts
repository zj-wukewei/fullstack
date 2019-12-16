import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role as RoleEntity } from './entity/role.entity';
import { Role } from './model/role';
import { RoleService } from './role.service';
import { RolePageInfo } from './model/role-page';
import RolePageArgs from './dto/role-page-args';
import { AuthRolesGuard } from '../../common/auth/auth-guard';
import { GqlAuthGuard } from '../../common/auth/gql.auth.guard';
import { Permissions } from '../../common/auth/permissions-decorators';
import { NewRoleInput } from './dto/new-role-input';

@Resolver(of => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(returns => RolePageInfo)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('ROLE_SELECT')
  async roles(@Args() args: RolePageArgs): Promise<RolePageInfo> {
    return await this.roleService.roles(args);
  }

  @Mutation(returns => Role)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('ROLE_CREATE')
  async addRole(@Args('newUserData') newUserData: NewRoleInput): Promise<RoleEntity> {
    return await this.roleService.addRole(newUserData);
  }
}
