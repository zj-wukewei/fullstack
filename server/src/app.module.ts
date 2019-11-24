import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppResolvers } from './app.resolvers';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [AppResolvers],
})
export class AppModule {}
