import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { Auth } from './models/auth';
import { AuthUser } from './models/auth-user';
import { userTramsforAuthUser } from 'src/utils/user.utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(phone: string, pass: string): Promise<User> {
    const user: User = await this.userService.findOneByPhone(phone);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<Auth> {
    const payload: AuthUser = { ...userTramsforAuthUser(user) };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
