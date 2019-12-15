import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from './entity/role.entity';
import { UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';

@Resolver(of => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}
}
