import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Auth, AuthUser } from '@users/common/src/models';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { userUtil } from '../../utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(phone: string, pass: string): Promise<User | null> {
    const user: User = await this.userService.findOneByPhone(phone);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<Auth> {
    const payload: AuthUser = { ...userUtil.userTramsforAuthUser(user) };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
