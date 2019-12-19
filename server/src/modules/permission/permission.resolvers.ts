import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { Permission as PermissionEntity } from './entity/permission.entity';
import { PermissionService } from './permission.service';
import { PermissionsPagination, Permission } from './model';
import { AuthRolesGuard, GqlAuthGuard, Permissions, CurrentUser } from '../../common/auth';
import { PermissionPageArgs, NewPermissionInput } from './dto';
import { AuthUser } from '../auth/models/auth-user';

@Resolver(of => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => PermissionsPagination)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('PERMISSION_SELECT')
  async permissions(@Args() args: PermissionPageArgs): Promise<PermissionsPagination> {
    return await this.permissionService.permissions(args);
  }

  @Mutation(() => Permission)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('PERMISSION_CREATE')
  async createPermission(
    @Args('newPermissionData') newPermissionData: NewPermissionInput,
  ): Promise<PermissionEntity> {
    return await this.permissionService.createPermission(newPermissionData);
  }

  @Mutation(() => Permission)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('PERMISSION_DELETE')
  async deletePermission(
    @Args({ name: 'id', type: () => Int }) id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<Permission | undefined> {
    return this.permissionService.deletePermission(id, user);
  }
}
