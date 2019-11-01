
module.exports = async (ctx, next) => {

  const { envLinks, debugData } = ctx.state;
  let getData = '';
  let message = '';
  const data = [];
  if (ctx.query && ctx.params.pageName) {
    const axiosUri = ctx.params.pageName === 'baike' ? 'query-article' : 'queryConsulArticle';
    try {
      getData = await ctx.state.axios(`${envLinks.toCHost}/baike/${axiosUri}`, {
        ...ctx.query,
      }, {
        method: 'post'
      })
    } catch (e) {
      ctx.logger.error(`${envLinks.toCHost}/baike/${axiosUri} 接口错误`);
      message = '接口查询错误';
    }
  } else {
    message = '参数错误';
  }

  if (getData.data && getData.data.data && getData.data.data.length > 0) {
    getData.data.data.forEach((item) => {
      data.push({
        title: item.title[0],
        id: item.id,
      });
    });

  }

  debugData('baikeSearch', getData);

  ctx.body = {
    code: 200,
    data,
    message,
  }

};
