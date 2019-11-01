/**
 * Created by JackieWu on 2019-07-06
 */

const Logger = require('../middle-container/xunke-logger');
const { name } = require('../../../package.json');

global.xunkeObject.Log = Logger({
  appName: name,
});

exports.init = (app) => {
  app.logger = global.xunkeObject.Log;
  return async (ctx, next) => {
    ctx.logger = app.logger;
    await next();
  }
};
