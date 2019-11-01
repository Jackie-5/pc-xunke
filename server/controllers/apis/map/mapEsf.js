
module.exports = async (ctx, next) => {

  const data = [];
  let getData = {};
  let query = ctx.query;
  let message = '';
  if (ctx.method === 'POST') {
    query = ctx.request.body;
  }

  const param = {
    areaId: "",
    areasOrBusinessOrLouPan: "",
    buildingAreaMax: ctx.query.area || '',
    buildingAreaMin: "0",
    businessAreaId: "",
    cityId: ctx.cityId,
    dateTime: new Date().getTime(),
    lpId: "",
    patternRoom: ctx.query.house || '',
    priceMax: ctx.query.price || '',
    priceMin: "0",
    webDomain: "www.xunkyz.com"
  };

  if (query.type === 'first') {
    try {
      getData = await ctx.state.axios('https://app02.xunkyz.com/api/house/getHouseListByCity', param, {
        method: 'post'
      })
    } catch (e) {
      ctx.logger.error('https://app02.xunkyz.com/api/house/getHouseListByCity 接口查询错误');
      message = '接口查询错误'
    }
  } else if (query.type === 'second') {
    try {
      getData = await ctx.state.axios('https://app02.xunkyz.com/api/house/getHouseListByArea', param, {
        method: 'post'
      })
    } catch (e) {
      ctx.logger.error('https://app02.xunkyz.com/api/house/getHouseListByArea 接口查询错误');
      message = '接口查询错误'
    }
  } else if (query.type === 'third') {
    try {
      getData = await ctx.state.axios('https://app02.xunkyz.com/api/house/getHouseListByBusinessArea', param, {
        method: 'post'
      })
    } catch (e) {
      ctx.logger.error('https://app02.xunkyz.com/api/house/getHouseListByBusinessArea 接口查询错误');
      message = '接口查询错误'
    }
  }
  if (getData.data && getData.data.length > 0) {
    getData.data.forEach((item) => {
      data.push({
        id: item.buildingId,
        houseCount: item.houseCount,
        areaName: item.areaValue || item.businessArea || item.buildingName,
        xaxis: item.longitude,
        yaxis: item.latitude,
        avgPrice: item.totalPrice
      })
    });
  }

  ctx.body = {
    code: 200,
    data,
    message,
  }

};
