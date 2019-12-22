import { Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(UnauthorizedException)
export default class UnauthorizedExceptionFilter implements GqlExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return new UnauthorizedException('身份信息已过期，请重新登录');
  }
}
