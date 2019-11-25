import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth/auth.service';
import { LoginArgs } from './auth/dto/auth.args';
import { Auth } from './auth/models/auth';

@Resolver('app')
export class AppResolvers {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => Auth)
  @UseGuards()
  async login(@Args('loginArgs') loginArgs: LoginArgs): Promise<Auth> {
    const user = await this.authService.validateUser(loginArgs.phone, loginArgs.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.authService.login(user);
  }
}
