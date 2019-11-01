/**
 * Created by JackieWu on 2018/7/15.
 */
const prefix = '/';
const routers = [
  {
    url: '',
    method: ['get'],
    action: ['/pages/index/index'],
    clientPath: [
      {
        name: 'index-main',
        clientPage: 'pages/index/main/index',
      },
      {
        name: 'index-city',
        clientPage: 'pages/index/city/index',
      },
    ],
  },
];

module.exports = {
  prefix,
  routers,
};
