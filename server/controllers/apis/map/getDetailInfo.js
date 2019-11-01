
const publicMethod = require('../../libs/public-method');

const numberSplit = publicMethod.numberSplit;

module.exports = async (ctx, next) => {
  let query = ctx.query;
  let message = '';
  let getData = {};
  const data = [];
  if (ctx.method === 'POST') {
    query = ctx.request.body;
  }

  try {
    getData = await ctx.state.axios('https://app02.xunkyz.com/api/house/getHouseListByLP', {
      areaId: "",
      areasOrBusinessOrLouPan: "",
      businessAreaId: "",
      cityId: "320500",
      dateTime: 1540197710000,
      lpId: query.id,
      webDomain: "www.xunkyz.com"
    }, {
      method: 'post'
    });

    if (getData.data.length > 0) {
      getData.data.forEach((item) => {
        data.push({
          title: item.title,
          buildingName: item.buildingName,
          houseModel: `${item.patternHall}室 ${item.patternRoom}厅 ${item.buildingArea}m²`,
          price: numberSplit(item.sellingPrice),
          unitPrice: numberSplit(item.averagePrice),
          metro_subway: '',
          id: item.no,
          imgUrl: item.imgUrl || "http://www.xunkyz.com/resources/css/images/admin/app/ad-3.png",
          tags: item.labelTypeValues ? item.labelTypeValues.split(',') : [],
        })
      });
    }
  } catch (e) {
    ctx.logger.error('https://app02.xunkyz.com/api/house/getHouseListByCity 接口查询错误');
    message = '接口查询错误'
  }


  ctx.body = {
    code: 200,
    data,
    message,
  };


};
