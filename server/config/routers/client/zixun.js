/**
 * Created by JackieWu on 2018/7/15.
 */
const prefix = 'zixun';
const routers = [
  {
    url: [
      '/',
      '/:code',
      '/:code/:page',
    ],
    method: ['get'],
    action: ['/pages/zixun/index'],
    clientPath: [
      {
        name: 'zixun-main',
        clientPage: 'pages/baike/main/index',
      },
      {
        name: 'zixun-list',
        clientPage: 'pages/baike/list/index',
      },
      {
        name: 'zixun-detail',
        clientPage: 'pages/baike/detail/index',
      },
    ],
  },
];

module.exports = {
  prefix: prefix,
  routers: routers
};
