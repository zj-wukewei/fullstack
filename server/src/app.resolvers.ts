import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth/auth.service';
import { LoginArgs } from './graphql.schema';

@Resolver('app')
export class AppResolvers {
  constructor(private readonly authService: AuthService) {}

  @Query()
  @UseGuards()
  async login(@Args('user') args: LoginArgs) {
    const user = await this.authService.validateUser(args.phone, args.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.authService.login(user);
  }
}
