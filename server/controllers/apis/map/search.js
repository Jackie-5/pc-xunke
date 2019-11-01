
module.exports = async (ctx, next) => {

  let getData = {};
  let message = '';
  let query = ctx.query;
  if (query.type === 'ershoufang') {
    if (query.t) {
      try {
        getData = await ctx.state.axios('https://app02.xunkyz.com/api/house/getHouseListByBusinessArea', {
          areaId: "",
          areasOrBusinessOrLouPan: query.t,
          businessAreaId: "",
          cityId: query.cityId || '320500',
          dateTime: new Date().getTime(),
          lpId: " ",
          webDomain: "www.xunkyz.com"
        }, {
          method: 'post'
        })
      } catch (e) {
        ctx.logger.error('https://app02.xunkyz.com/api/house/getHouseListByBusinessArea 接口查询错误');
        message = '接口查询错误'
      }
    }
  }


  ctx.body = {
    code: 200,
    data: getData.data || [],
    message,
  }

};
