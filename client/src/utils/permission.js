const checkPermission = (match, permission = []) => {
    // 没办法ADMIN就是这么牛
    const isAdmin = checkIsAdmin(permission);
    if (isAdmin) {
        return true;
    }
    const show = permission.some(item => item.includes(match));
    return show;
}

const checkIsAdmin = (permission) => {
    return permission.some(item => item === "ADMIN");
};


export {
    checkPermission,
    checkIsAdmin
};