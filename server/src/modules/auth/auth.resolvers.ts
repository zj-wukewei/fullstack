import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Auth } from './models/auth';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';

import { LoginArgs } from './dto/auth.args';
import { UserNotFoundException } from '../../common/exception/user-not-found-exception';

@Resolver(of => Auth)
export class AuthResolver {
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
