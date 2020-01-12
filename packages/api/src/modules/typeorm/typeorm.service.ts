import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';

import { User } from '../user/entity/user.entity';
import { UserInfo } from '../user/entity/user-info.entity';

import { Permission } from '../permission/entity/permission.entity';
import { Role } from '../role/entity/role.entity';

const CLS_NAME = 'TypeormService';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  private logger: Logger;

  constructor(readonly configService: ConfigService) {
    this.logger = new Logger(CLS_NAME);
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
      host: this.configService.DB_HOST,
      port: this.configService.DB_PORT,
      username: this.configService.DB_USER,
      password: this.configService.DB_PASSWORD,
      database: this.configService.DB_DATABASE,
      synchronize: this.configService.DB_SYNCHRONIZE,
      logging: process.env.NODE_ENV !== 'production',
      entities: [User, UserInfo, Permission, Role],
    };

    if (this.configService.DB_TYPE === 'mysql') {
      options = {
        ...options,
        ...{
          type: 'mysql',
          charset: 'utf8mb4',
          collation: 'utf8mb4_unicode_ci',
          keepConnectionAlive: true,
          acquireTimeout: 20 * 1000,
        },
      };
    }

    return options;
  }
}
