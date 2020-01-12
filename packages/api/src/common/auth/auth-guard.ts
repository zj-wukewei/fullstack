import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AuthUser } from '@users/common/src/models';
import { errorUtil } from '../../utils';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context).getContext();
    const user: AuthUser = ctx && ctx.req.user;

    if (!user) {
      return errorUtil.ILLEGAL_USER();
    }

    if (!user.permission || user.permission.length === 0) {
      return errorUtil.NOT_AUTH({ user });
    }

    if (user.permission && user.permission.some(item => item === 'ADMIN')) {
      // ADMIN有全部权限
      return true;
    }

    return user.permission && user.permission.some(permission => permissions.includes(permission));
  }
}
