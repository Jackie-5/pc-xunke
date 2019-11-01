/**
 * Created by JackieWu on 2019/1/14.
 */
const getDomain = require('../../controllers/public-api/getDomain');

module.exports = async (ctx, next) => {

  const { globalConfig } = ctx.state;
  const hostSplit = ctx.hostname.split('.');
  hostSplit.splice(0, 1);
  const host = hostSplit.join('.');
  let domain = host;
  if (globalConfig.pcDomain[host]) {
    domain = globalConfig.pcDomain[host];
  }

  ctx.state.basisCurrentDomain = await getDomain({
    ctx,
    domain,
  });

  await next();
};