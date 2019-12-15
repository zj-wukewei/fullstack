import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { Auth } from './models/auth';
import { AuthUser } from './models/auth-user';

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
    const roles = user.roles.map(item => item.name);
    const permission = user.roles
      .map(item => (item.permissions && item.permissions.map(p => p.name)) || '')
      .filter(item => item !== '')
      .join(',')
      .split(',');
    const payload: AuthUser = { phone: user.phone, id: user.id, info: user.info, roles, permission };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
