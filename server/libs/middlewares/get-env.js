/**
 * Created by JackieWu on 2018/7/15.
 */
const globalConfig = require('../../config/index');
const { getServerProperties } = require('../middle-container/server-env');
const ENV = getServerProperties();

const envLinks = require(`../../config/node-env/${ENV}`);

exports.init = async (app) => {
  app.ENV = ENV;
  app.envLinks = envLinks;
  
  return async function (ctx, next) {
    ctx.state.ENV = app.ENV;
    ctx.state.envLinks = app.envLinks;
    ctx.state.globalConfig = globalConfig;
    await next();
  };
};
