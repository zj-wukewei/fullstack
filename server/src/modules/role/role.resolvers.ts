import { UseGuards } from '@nestjs/common';
import { Int } from 'type-graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role as RoleEntity } from './entity/role.entity';
import { Role, RolesPagination } from './model';
import { RoleService } from './role.service';
import { AuthRolesGuard, GqlAuthGuard, Permissions, CurrentUser } from '../../common/auth';
import { NewRoleInput, RolePageArgs, UpdateRoleInput } from './dto';
import { AuthUser } from '../auth/models/auth-user';

@Resolver(of => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => RolesPagination)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('ROLE_SELECT')
  async roles(@Args() args: RolePageArgs): Promise<RolesPagination> {
    return await this.roleService.roles(args);
  }

  @Query(() => Role)
  async role(@Args({ name: 'id', type: () => Int }) id: number): Promise<RoleEntity> {
    return await this.roleService.role(id);
  }

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('ROLE_CREATE')
  async createRole(@Args('newRoleData') newRoleData: NewRoleInput): Promise<RoleEntity> {
    return await this.roleService.createRole(newRoleData);
  }

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('ROLE_UPDATE')
  async updateRole(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('updateRoleData') updateRoleInput: UpdateRoleInput,
  ): Promise<RoleEntity> {
    return await this.roleService.updateRole(id, updateRoleInput);
  }

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('ROLE_DELETE')
  async deleteRole(
    @Args({ name: 'id', type: () => Int }) id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<RoleEntity | undefined> {
    return this.roleService.deleteRole(id, user);
  }
}
