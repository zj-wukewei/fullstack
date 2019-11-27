import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { UserNotFoundException } from 'src/common/exception/UserNotFoundException';

@Catch(UserNotFoundException)
export default class UserNotFoundExceptionFilter implements GqlExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return new Error("用户未找到！");
  }
}
