import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from './modules/config/config.module';
import { DateScalar } from './common/scalars/data.scalar';

import UnauthorizedExceptionFilter from './common/filter/unauthorizd-exception-filter';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    ConfigModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
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
