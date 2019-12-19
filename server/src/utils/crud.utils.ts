import { Repository } from 'typeorm';
import { loggerUtil } from './logger.utils';
import { AuthUser } from '../modules/auth/models/auth-user';

const commonDelete = async (
  repository: Repository<any>,
  CLS_NAME: string,
  id: number,
  user?: AuthUser,
) => {
  const prevId = id;
  const prevItem = await repository.findOne(id);
  if (!prevItem) {
    const message = `没有找到id:${id}`;
    loggerUtil.warn(message, CLS_NAME);
    return undefined;
  }

  const nextItem = await repository.remove(prevItem);

  if (!nextItem) {
    const message = `删除失败id:${id}`;

    loggerUtil.warn(message, CLS_NAME);

    return undefined;
  }

  loggerUtil.warn(
    `删除成功id:${id},操作者id:${(user && user.id) || '未知'}: ${JSON.stringify(nextItem)}\n\n`,
    CLS_NAME,
  );

  return {
    ...nextItem,
    id: prevId,
  };
};

export const curdUtil = {
  commonDelete,
};
