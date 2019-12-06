
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  cssLoaderOptions: {
    localIdentName: '[local]',
  },
  routes: [
    {
      path: '/',
      component: '../app',
      routes: [
        { path: "/", component: "./index" },
        { path: '/login', component: '../pages/login/index' },
        { path: '/*', component: '../layouts', routes: [
          { path: '/users', component: './users/index', exact: true },
          { path: '/users/info/:id', component: './users/info/$id.js', exact: true },
          ] 
        },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      locale: {
        default: 'zh-CN'
      },
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'client',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
