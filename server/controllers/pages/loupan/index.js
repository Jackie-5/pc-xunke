/**
 * Created by JackieWu on 2018/7/15.
 */
require('../../../libs/middleware-page/render-polyfill');
const render = require('../../../libs/middleware-page/render-to-string');
const renderHtml = require('../../libs/render-html');


module.exports = async (ctx, next) => {
  let pageName = 'loupan-main';

  await renderHtml({
    ctx,
    render: await render({
      ctx: ctx,
      params: {
        sadfas: "aaaaa"
      },
      pageName,
    }),
    seoPageFile: 'loupan',
    seoPage: pageName,
    isSeo: false,
    // seoImages,
  });
};
