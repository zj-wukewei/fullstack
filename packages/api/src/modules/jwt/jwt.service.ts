import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtServiceFacory implements JwtOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const options = {
      secret: this.configService.getJwtSecretKey(),
      signOptions: { expiresIn: this.configService.getJwtEexpiresIn() },
    };
    return options;
  }
}
