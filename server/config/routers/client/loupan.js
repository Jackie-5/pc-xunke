/**
 * Created by JackieWu on 2018/7/15.
 */
const prefix = 'loupan';
const routers = [
  {
    url: ['/'],
    method: ['get'],
    action: ['/pages/loupan/index'],
    clientPath: [
      {
        name: 'loupan-main',
        clientPage: 'pages/loupan/app',
      },
    ],
  },
];

module.exports = {
  prefix: prefix,
  routers: routers
};
