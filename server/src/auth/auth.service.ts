import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';
import { Auth } from '../auth/models/auth';

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

  async login(user: User): Promise<Auth> {
    const payload = { phone: user.phone, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
