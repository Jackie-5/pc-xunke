
export default (ctx) => {
  const {name, xaxis, yaxis} = ctx.state.currentCity;
  return {
    ['zixun-main']: (renderToStringObj) => {
      return {
        title: `${name}房产资讯_${name}房地产楼市新闻_新房楼盘动态_${name}-${renderToStringObj.initState.domainDetail.companyName}资讯`,
        keywords: `${name}房产新闻,${name}房产资讯,${name}房地产新闻,房产资讯,${name}楼市新闻，房产楼盘动态`,
        description: `${name}房产楼盘新闻动态,${name}源浩网提供及时${name}房地产新闻、${name}房产资讯，为您解读${name}房产实时政策，预测${name}房价走势，分析${name}楼市成交数据。${renderToStringObj.initState.domainDetail.companyName}权威房地产媒体！`,
        cityName: name,
        coord: `${yaxis},${xaxis}`,
      }
    },

    ['zixun-list']: (renderToStringObj) => {
      let categoryName = '资讯';
      if (renderToStringObj.initState.baikeCategory && renderToStringObj.initState.baikeCategory.length > 0) {
        if (renderToStringObj.initState.code) {
          renderToStringObj.initState.baikeCategory.forEach((item) => {
            if (item.id === renderToStringObj.initState.code) {
              item.active = true;
              categoryName = item.name;
            }
            if (!item.active) {
              if (item.childs && item.childs.length > 0) {
                item.childs.forEach((it) => {
                  if (it.id === renderToStringObj.initState.code) {
                    it.active = true;
                    categoryName = it.name;
                  }
                });
              }
            }
          });
        }
      }
      return {
        title: `${name}${categoryName}_${categoryName}信息-${name}${renderToStringObj.initState.domainDetail.companyName}`,
        keywords: `${name}${categoryName},${categoryName}信息,${name}${renderToStringObj.initState.domainDetail.companyName}`,
        description: `${name}${renderToStringObj.initState.domainDetail.companyName}房产资讯频道即时提供${name}房地产知识、房产资讯等内容，为您提供${name}最新${categoryName}相关的知识资讯，综合整理${categoryName}的知识信息。`,
        cityName: name,
        coord: `${yaxis},${xaxis}`,
      }
    },
    ['zixun-detail']: (renderToStringObj) => {
      const { initState } = renderToStringObj;
      const { detailBaike = {} } = initState;
      const { detail = {} } = detailBaike;
      return {
        title: `${detail.title}-${name}${renderToStringObj.initState.domainDetail.companyName}`,
        keywords: `${detail.title},${name}${renderToStringObj.initState.domainDetail.companyName}`,
        description: `${detail.summary}`,
        cityName: name,
        coord: `${yaxis},${xaxis}`,
      }
    }
  }
}
