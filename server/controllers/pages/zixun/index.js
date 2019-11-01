/**
 * Created by JackieWu on 2018/7/15.
 */
require('../../../libs/middleware-page/render-polyfill');
const render = require('../../../libs/middleware-page/render-to-string');
const serviceFetch = require('./service-fetch');
const renderHtml = require('../../libs/render-html');
const axios = require('axios');

module.exports = async (ctx, next) => {
  let pageName = 'zixun-main';
  let params = {
    pageName: {
      key: 'zixun',
      name: '资讯',
    },
  };

  if (ctx.params.code) {

    if (ctx.params.code.includes('.html')) {
      pageName = 'zixun-detail';
      params.detailBaike = await serviceFetch.detailZixun(ctx);
      params.newBaikeList = await serviceFetch.newZixunList(ctx, params.detailBaike.parentCode);
    } else {
      if (ctx.params.code === 'list' || ctx.params.code.includes('rs') || Number(ctx.params.code).toString() !== 'NaN') {
        pageName = 'zixun-list';
        const data = await axios.all([
          serviceFetch.zixunCategory(ctx),
          serviceFetch.newZixunList(ctx),
        ]);
        params.baikeCategory = data[0];
        params.newBaikeList = data[1];
        params.code = ctx.params.code;
        params.page = ctx.params.page;
        params.localPath = ctx.path;
      }  else {
        ctx.throw(404);
      }
    }
  }

  if (pageName === 'zixun-main') {
    const data = await axios.all([
      serviceFetch.zixunCategory(ctx),
      serviceFetch.newZixunList(ctx),
      serviceFetch.getMainList(ctx),
    ]);


    params.baikeCategory = data[0];
    params.newBaikeList = data[1];
    params.mainList = data[2];

  }

  await renderHtml({
    ctx,
    render: await render({
      ctx: ctx,
      params,
      pageName,
    }),
    seoPageFile: 'zixun',
    seoPage: pageName,
    isSeo: true,
  });
};
