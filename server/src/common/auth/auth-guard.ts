import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
          return true;
        }
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role.name));
        return  user && user.roles && hasRole();
    }

 
}
