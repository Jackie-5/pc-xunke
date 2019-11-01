/**
 * Created by JackieWu on 2018/7/15.
 */
const prefix = 'baike';
const routers = [
  {
    url: [
      '/',
      '/:code',
      '/:code/:page',
    ],
    method: ['get'],
    action: ['/pages/baike/index'],
    clientPath: [
      {
        name: 'baike-main',
        clientPage: 'pages/baike/main/index',
      },
      {
        name: 'baike-list',
        clientPage: 'pages/baike/list/index',
      },
      {
        name: 'baike-detail',
        clientPage: 'pages/baike/detail/index',
      },
    ],
  },
];

module.exports = {
  prefix: prefix,
  routers: routers
};
