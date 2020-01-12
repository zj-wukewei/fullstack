import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { PermissionsPagination, Permission, AuthUser } from '@users/common/src/models';
import { PermissionPageArgs, NewPermissionInput } from '@users/common/src/dto';
import { Permission as PermissionEntity } from './entity/permission.entity';
import { PermissionService } from './permission.service';
import { AuthRolesGuard, GqlAuthGuard, Permissions, CurrentUser } from '../../common/auth';

@Resolver(() => Permission)
@UseGuards(GqlAuthGuard)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => PermissionsPagination)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('PERMISSION_SELECT')
  async permissions(@Args() args: PermissionPageArgs): Promise<PermissionsPagination> {
    return this.permissionService.permissions(args);
  }

  @Mutation(() => Permission)
  @UseGuards(GqlAuthGuard, AuthRolesGuard)
  @Permissions('PERMISSION_CREATE')
  async createPermission(@Args('newPermissionData') newPermissionData: NewPermissionInput): Promise<PermissionEntity> {
    return this.permissionService.createPermission(newPermissionData);
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
