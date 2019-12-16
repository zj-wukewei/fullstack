const masterRoute = [{
    name: '用户',
    permission: 'USER_CREATE | USER_SELECT | ROLE_CREATE | ROLE_SELECT | PERMISSION_CREATE | PERMISSION_SELECT',
    path: '_user_group',
    icon: 'user',
    allow: false,
    children: [{
        name: '用户',
        permission: 'USER_CREATE | USER_SELECT',
        path: '/users',
        icon: 'icon-user',
    },
    {
        name: '角色',
        permission: 'ROLE_CREATE | ROLE_SELECT',
        path: '/roles',
        icon: 'icon-role',
    },
    {
        name: '权限',
        permission: 'PERMISSION_CREATE | PERMISSION_SELECT',
        path: '/permissions',
        icon: 'icon-permission',
    }]
}];


export {
    masterRoute
};