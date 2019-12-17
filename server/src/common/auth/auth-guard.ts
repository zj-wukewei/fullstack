import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { errorUtil } from '../../utils/error.utils';

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

    if (!user) {
      return errorUtil.ILLEGAL_USER();
    }

    if (!user.roles || user.roles.length === 0 || !user.permission || user.permission.length === 0) {
      return errorUtil.NOT_AUTH({ user: user });
    }

    const hasRole = () => {
      if (user.permission.some(item => item === 'ADMIN')) {
        // ADMIN有全部权限
        return true;
      }
      return user.permission.some(permission => permission.includes(permissions));
    };
    return user && user.roles && hasRole();
  }
}
