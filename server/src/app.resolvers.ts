import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth/auth.service';
import { LoginArgs } from './auth/dto/auth.args';
import { Auth } from './auth/models/auth';
import { UserNotFoundException } from './common/exception/user-notfound-exception';

@Resolver('app')
export class AppResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Auth)
  @UseGuards()
  async login(@Args() loginArgs: LoginArgs): Promise<Auth> {
    const user = await this.authService.validateUser(loginArgs.phone, loginArgs.password);
    if (!user) {
      throw new UserNotFoundException();
    }
    return await this.authService.login(user);
  }
}
