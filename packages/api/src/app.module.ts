import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ConfigModule } from './modules/config/config.module';
import { DateScalar } from './common/scalars/data.scalar';
import { TypeormService } from './modules/typeorm/typeorm.service';

import UnauthorizedExceptionFilter from './common/filter/unauthorizd-exception-filter';
import { loggerUtil } from './utils';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    ConfigModule,
    PermissionModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      formatError(error: any) {
        loggerUtil.error(`${JSON.stringify(error)}\n`, 'GraphQLModule');
        if (error.message && error.message.message) {
          return new Error(error.message.message);
        }
        return error;
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    ConfigModule,
    DateScalar,
  ],
})
export class AppModule {}
