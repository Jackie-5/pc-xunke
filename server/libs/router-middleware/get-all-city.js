/**
 * Created by JackieWu on 2019/5/5.
 */

module.exports = async (ctx, next) => {
  const { debugData, basisCurrentDomain, axios } = ctx.state;
  const { toCHost } = ctx.state.envLinks;
  const params = {
    code: 'region',
    domain: basisCurrentDomain.domain,
  };
  const redisKey = ctx.redisSaveFn('queryAllDataDictToCForShow', params);
  // 先获取到所有的城市
  let data = await ctx.redisGet(redisKey);

  if (!data) {
    try {
      data = await axios(`${toCHost}/queryAllDataDictToCForShow`, params, {
        method: 'post',
      });

      if (data.data && data.data.length > 0) {
        await ctx.redisSet(redisKey, data);
      }

    } catch (e) {
      ctx.throw(404, '获取city错误');
    }
  }

  if (data.data && data.data.length === 0) {
    ctx.throw(401, '当前暂无开通城市');
  }

  debugData('allCityData', data);

  ctx.state.cityList = data.data || [];

  await next();
};
