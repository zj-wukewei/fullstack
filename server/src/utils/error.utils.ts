import { loggerUtil } from './logger.utils';
import { User } from '../modules/user/entity/user.entity';
import { CommonException } from '../common/exception/common-exception';

interface IErrorPramas {
  error: string | { CLS_NAME?: string; message?: string };
  user?: User;
}

const handleError = ({ error, user }: IErrorPramas) => {
  const userId = user ? user.id : 'NOT-USER';
  const errorText = typeof error === 'string' ? error : JSON.stringify(error);

  loggerUtil.warn(
    `${errorText}/userId:${userId}`,
    (error && typeof error === 'object' && error.CLS_NAME) || 'ErrorUtil',
  );

  throw new CommonException(errorText);
};

const NOT_AUTH = (params?: { user?: User }) =>
  handleError({ error: '无权限查看', user: params && params.user });
const NOT_FOUND = (params?: { user?: User }) =>
  handleError({ error: '未找到', user: params && params.user });
const ILLEGAL_USER = (params?: { user?: User }) =>
  handleError({ error: '非法用户', user: params && params.user });

export const errorUtil = {
  ERROR: handleError,
  NOT_AUTH,
  NOT_FOUND,
  ILLEGAL_USER,
};
