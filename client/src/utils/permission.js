const checkPermission = (match, permission = []) => {
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

const checkIsAdmin = permission => {
  return permission.some(item => item === 'ADMIN');
};

export { checkPermission, checkIsAdmin };
