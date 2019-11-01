/**
 * Created by JackieWu on 2018/7/15.
 */
require('../../libs/middleware-page/render-polyfill');
const render = require('../../libs/middleware-page/render-to-string');
const renderHtml = require('../libs/render-html');

module.exports = async (ctx, next) => {
  const code = ['ershoufang', 'xinfang', 'xiaoqu'];
  let nowCode = 'ershoufang';
  const getPage = 'ditu-main';

  if (ctx.params.code) {
    if (code.includes(ctx.params.code)) {
      nowCode = ctx.params.code;
    } else {
      ctx.throw(404);
    }
  }

  await renderHtml({
    ctx,
    render: await render({
      pageName: getPage,
      ctx,
      params: {
        code: nowCode,
      },
    }),
    seoPageFile: 'ditu',
    seoPage: getPage,
    isSeo: false,
    containerHtml: 'ditu',
  });

};
