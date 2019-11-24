import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { LoginResult } from '../graphql.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(phone: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findOneByPhone(phone);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<LoginResult> {
    const payload = { phone: user.phone, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
