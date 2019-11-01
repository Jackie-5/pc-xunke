/**
 * Created by JackieWu on 2018/7/15.
 */
require('../../../libs/middleware-page/render-polyfill');
const render = require('../../../libs/middleware-page/render-to-string');
const renderHtml = require('../../libs/render-html');
const axios =  require('axios');
const serverFetch = require('./index-fetch');
const banner = require('./banner.json');


module.exports = async (ctx, next) => {
  const { currentCity, globalConfig, firstHost, } = ctx.state;

  let pageName = 'index-city';
  let bannerJson = [];

  if (firstHost !== 'www') {
    pageName = 'index-main';
    bannerJson = banner;
  }

  //
  // const indexGetData = await axios.all([
  //   serverFetch.ershoufangList(ctx),
  //   serverFetch.loupanList(ctx),
  //   serverFetch.xiaoquList(ctx),
  // ]);

  await renderHtml({
    ctx,
    render: await render({
      ctx,
      params: {
        bannerJson,
        // ershoufangList: indexGetData[0],
        // loupanList: indexGetData[1],
        // xiaoquList: indexGetData[2],
      },
      pageName,
    }),
    seoPageFile: 'index',
    seoPage: pageName,
    isSeo: false,
    seoImages: [
      globalConfig.seoImg.logo,
      globalConfig.seoImg.defaultImg1,
      globalConfig.seoImg.defaultImg2,
    ],
  });
};
