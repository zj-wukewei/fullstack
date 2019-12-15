import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const hasRole = () => {
      if ('ADMIN'.includes(user.permission)) {
        // ADMIN有全部权限
        return true;
      }
      return user.permission.some(permission => permission.includes(permissions));
    };
    return user && user.roles && hasRole();
  }
}
