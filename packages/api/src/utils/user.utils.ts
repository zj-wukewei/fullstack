import { AuthUser } from '@users/common/src/models';
import { User } from '../modules/user/entity/user.entity';

const userTramsforAuthUser = (user: User): AuthUser => {
  const roles = user.roles && user.roles.map(item => item.name);
  let permission: string[] | undefined = [];
  if (roles && roles.length > 0) {
    permission =
      user.roles &&
      user.roles
        .map(item => (item.permissions && item.permissions.map(p => p.name)) || '')
        .filter(item => item !== '')
        .join(',')
        .split(',');
  }

  return Object.assign(new AuthUser(), user, { roles, permission });
};

export const userUtil = { userTramsforAuthUser };
