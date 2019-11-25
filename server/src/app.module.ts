import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppResolvers } from './app.resolvers';
import { DateScalar } from './common/scalars/data.scalar';

import { UnauthorizedExceptionFilter } from './filter/UnauthorizedExceptionFilter';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [
   
    AppResolvers, DateScalar],
})
export class AppModule {}
