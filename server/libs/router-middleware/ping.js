/**
 * Created by JackieWu on 2019/1/14.
 */

module.exports = async (ctx, next) => {
  if (ctx.path === '/ping') {
    ctx.body = 'pong';
    return;
  }
  await next();
};

