import { User } from '../modules/user/entity/user.entity';
import { AuthUser } from '../modules/auth/models/auth-user';

const userTramsforAuthUser = (user: User): AuthUser => {
  const roles = user.roles.map(item => item.name);
  const permission = user.roles
    .map(item => (item.permissions && item.permissions.map(p => p.name)) || '')
    .filter(item => item !== '')
    .join(',')
    .split(',');
  return Object.assign(new AuthUser(), user, { roles, permission });
};

export { userTramsforAuthUser };
