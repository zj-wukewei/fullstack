import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  cssLoaderOptions: {
    localIdentName: '[local]',
  },
  routes: [
    {
      path: '/',
      component: '../app',
      routes: [
        { path: '/', component: './index' },
        { path: '/login', component: '../pages/login/index' },
        {
          path: '/*',
          component: '../layouts',
          routes: [
            { path: '/home', component: './home/index', exact: true },
            { path: '/users', component: './users/index', exact: true },
            { path: '/users/info/:id', component: './users/info/$id', exact: true },
            { path: '/roles', component: './roles/index', exact: true },
            { path: '/roles/:id', component: './roles/$id/index', exact: true },
            { path: '/permissions', component: './permissions/index', exact: true },
            { path: '/*', component: './404' },
          ],
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'dashboard',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
         locale: {
          default: 'zh-CN', //默认语言 zh-CN
        },
      },
    ],
  ],
};

export default config;
