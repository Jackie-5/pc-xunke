/**
 * Created by JackieWu on 2018/7/15.
 */
const Koa = require('koa');
const convert = require('koa-convert');
const staticCache = require('koa-static-cache');
const config = require('./config/index');
const router = require('./libs/middlewares/routers');

// 实例化koa
const app = new Koa();

// 创建一个全局的私有对象
global.xunkeObject = {};

app.init = async () => {
  // 统一错误的处理
  app.on('error', (e) => {
    app.logger.error(e);
  });

  // middleware
  const middlewares = [
    'log',
    'get-env',
    'header-access',
    'redis',
    'axios',
    'render',
    'body',
    'throw-error',
    'debug-backend',
  ];

  for (let file of middlewares) {
    let md = require(`./libs/middlewares/${file}`);
    let middleware = await md.init(app);
    app.use(convert(middleware));
  }
};

(async () => {
  const port = config.port;

  await app.init();

  app.use(router.routes()).use(router.allowedMethods());

  app.use(staticCache(config.DIST_STATIC, {
    prefix: '/dist',
  }));



  app.listen(port, () => {
    app.logger.info(`The start success. port ${port}`)
  });
})();

