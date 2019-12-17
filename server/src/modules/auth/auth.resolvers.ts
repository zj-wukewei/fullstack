import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Auth } from './models/auth';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';

import { LoginArgs } from './dto/auth.args';
import { errorUtil } from '../../utils/error.utils';

@Resolver(of => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Auth)
  @UseGuards()
  async login(@Args() loginArgs: LoginArgs): Promise<Auth> {
    const user = await this.authService.validateUser(loginArgs.phone, loginArgs.password);
    if (!user) {
      return errorUtil.ERROR({ error: "用户未找到" });
    }
    return await this.authService.login(user);
  }
}
