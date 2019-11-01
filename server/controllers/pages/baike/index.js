/**
 * Created by JackieWu on 2018/7/15.
 */
require('../../../libs/middleware-page/render-polyfill');
const render = require('../../../libs/middleware-page/render-to-string');
const serviceFetch = require('./service-fetch');
const renderHtml = require('../../libs/render-html');

const { getBaikeListImage } = require('../../libs/seo-public-img');

const axios = require('axios');

module.exports = async (ctx, next) => {
  let pageName = 'baike-main';
  let params = {
    pageName: {
      key: 'baike',
      name: '百科',
    },
  };

  let seoImages = [];
  if (ctx.params.code) {

    if (ctx.params.code.includes('.html')) {
      pageName = 'baike-detail';
      params.detailBaike = await serviceFetch.detailBaike(ctx);
      params.newBaikeList = await serviceFetch.newBaikeList(ctx, params.detailBaike.parentCode);
    } else {
      if (ctx.params.code === 'list' || ctx.params.code.includes('rs') || Number(ctx.params.code).toString() !== 'NaN') {
        pageName = 'baike-list';
        const data = await axios.all([
          serviceFetch.baikeCategory(ctx),
          serviceFetch.newBaikeList(ctx),
        ]);
        params.baikeCategory = data[0];
        params.newBaikeList = data[1];
        params.code = ctx.params.code;
        params.page = ctx.params.page;
        params.localPath = ctx.path;

        seoImages = getBaikeListImage(ctx, params.newBaikeList.data);
      }  else {
        ctx.throw(404);
      }
    }
  }

  if (pageName === 'baike-main') {
    const data = await axios.all([
      serviceFetch.baikeCategory(ctx),
      serviceFetch.newBaikeList(ctx),
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
    seoPageFile: 'baike',
    seoPage: pageName,
    isSeo: true,
    seoImages,
  });
};
