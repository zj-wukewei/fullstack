import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Auth } from '@users/common/src/models';
import { LoginArgs } from '@users/common/src/dto';
import { AuthService } from './auth.service';

import { errorUtil } from '../../utils';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards()
  async login(@Args() loginArgs: LoginArgs): Promise<Auth> {
    const user = await this.authService.validateUser(loginArgs.phone, loginArgs.password);
    if (!user) {
      return errorUtil.ERROR({ error: '用户未找到' });
    }
    return this.authService.login(user);
  }
}
