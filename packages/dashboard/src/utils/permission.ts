const checkIsAdmin = (permission: string[]): boolean => {
  return permission.some(item => item === 'ADMIN');
};

const checkPermission = (match: string, permission: string[]): boolean => {
  // 没办法ADMIN就是这么牛
  if (checkIsAdmin(permission)) {
    return true;
  }

  if (match.includes('|')) {
    return match
      .split('|')
      .map(p => p.trim())
      .some(k => permission.includes(k));
  }

  return permission.some(k => k === match);
};

export { checkPermission, checkIsAdmin };
