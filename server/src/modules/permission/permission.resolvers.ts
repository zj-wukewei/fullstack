import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from './model/permission';
import { PermissionService } from './permission.service';

@Resolver(of => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  
}
