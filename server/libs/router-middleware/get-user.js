
const { parseJSON } = require('../../controllers/libs/public-method');

module.exports = async (ctx, next) => {

  ctx.state.userInfo = {};

  if (ctx.cookies.get('userInfo')) {
    ctx.state.userInfo = parseJSON(ctx.cookies.get('userInfo'));
  }

  await next();
};
