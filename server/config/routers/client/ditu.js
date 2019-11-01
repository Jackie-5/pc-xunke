/**
 * Created by JackieWu on 2018/7/15.
 */
const prefix = 'ditu';
const routers = [
  {
    url: ['/', '/:code'],
    method: ['get'],
    action: ['/pages/ditu'],
    clientPath: [
      {
        name: 'ditu-main',
        css: 'pages/ditu/main/index.css',
        pageJs: 'pages/ditu/main/app.js',
      },
    ],
  },
];

module.exports = {
  prefix,
  routers,
};
