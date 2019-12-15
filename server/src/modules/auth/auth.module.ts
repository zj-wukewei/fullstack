import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../common/auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolvers';
import { JwtServiceFacory } from '../jwt/jwt.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtServiceFacory,
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
