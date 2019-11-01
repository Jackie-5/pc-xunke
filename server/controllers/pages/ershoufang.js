/**
 * Created by JackieWu on 2018/7/15.
 */
require('../../libs/middleware-page/render-polyfill');
const renderToString = require('../../libs/middleware-page/render-to-string');
const headerJson = require('../../api/page-json/header.json');
const rightMethod = require('../../api/page-json/right-method.json');
const footerJson = require('../../api/page-json/footer.json');

module.exports = async (ctx, next) => {
  const renderToStringObj = await renderToString({
    envLinks: ctx.state.envLinks,
    params: {
      ...ctx.params,
      currentCity: ctx.state.currentCity
    },
    page: `ershoufang-${ctx.params.code || 'list'}`,
    ctx: ctx,
    props: {
      headerJson,
      rightMethod,
      footerJson
    }
  });
  renderToStringObj.initState = {
    ...renderToStringObj.initState,
    ...{
      headerJson,
      rightMethod,
      footerJson
    },
  };

  await ctx.render('container', {
    title: '',
    keywords: '',
    description: '',
    ...renderToStringObj
  });
};
