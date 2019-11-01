/**
 * Created by Jackie.Wu on 2018/8/23.
 */
const dayjs = require('dayjs');
const fs = require('fs');

module.exports = async (options) => {

  const { ctx, render, seoPageFile, seoPage, isSeo, containerHtml, seoImages } = options;

  const { globalConfig, ENV } = ctx.state;

  let host = 'www.xunkw.com';
  if (ENV !== 'dev') {
    const splitHost = ctx.hostname.split('.');
    host = `www.${splitHost[splitHost.length - 2]}.${splitHost[splitHost.length - 1]}`
  }

  const { initState = {} } = render;

  let seoContainer = {
    title: initState.domainDetail.companyName,
    keywords: initState.domainDetail.companyName,
    description: initState.domainDetail.companyName,
    cityName: initState.currentCity?.name || '',
    coord: `${initState.currentCity?.xaxis},${initState.currentCity?.yaxis}`,
  };


  if (seoPageFile && seoPage && isSeo) {
    const seoContent = require('../config/seo')(ctx);
    seoContainer = Object.assign(seoContainer, seoContent[seoPageFile][seoPage](render));
  }



  await ctx.render(`${containerHtml ? containerHtml : 'container'}`, {
    ...seoContainer,
    ...render,
    seoJson: {
      "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
      "@id": ctx.href,
      "appid": "1594150446608720",
      "title": seoContainer.title,
      "images": seoImages && seoImages.length > 0 ? seoImages : [
        globalConfig.seoImg.logo,
        globalConfig.seoImg.defaultImg1,
        globalConfig.seoImg.defaultImg2,
      ], //请在此处添加希望在搜索结果中展示图片的url，可以添加1个或3个url
      "pubDate": `${dayjs().format('YYYY-MM-DD')}T${dayjs().format('hh:mm:ss')}` // 需按照yyyy-mm-ddThh:mm:ss格式编写时间，字母T不能省去
    },
    pushInfo: {
      zhanzhang: globalConfig[host][`${ctx.protocol}Zhanzhang`],
      passport360: globalConfig[host][`${ctx.protocol}360`],
      baidushangqiao: globalConfig[host][`${ctx.protocol}Baidushangqiao`],
    },
  });


  // await ctx.render(`${containerHtml ? containerHtml : 'container'}`, Object.assign(seoContainer, render));
};
