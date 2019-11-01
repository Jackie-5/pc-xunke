
module.exports = (ctx) => {
  const {name, xaxis, yaxis} = ctx.state.currentCity;
  return {
    ['baike-main']: (renderToStringObj) => {
      return {
        title: `${name}房产百科_${name}房产知识_${name}房地产百科网-${name}${renderToStringObj.initState.domainDetail.companyName}`,
        keywords: `${name}房产百科,${name}房产知识,${name}房地产百科网,${name}${renderToStringObj.initState.domainDetail.companyName}`,
        description: `${renderToStringObj.initState.domainDetail.companyName}${name}房产百科频道即时提供${name}房地产知识、${name}房产百科，为您提供${name}最新房产相关的知识百科，综合整理买房必看的知识信息。`,
        cityName: name,
        coord: `${yaxis},${xaxis}`,
      }
    },

    ['baike-list']: (renderToStringObj) => {
      let categoryName = '百科';
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
        description: `${name}${renderToStringObj.initState.domainDetail.companyName}房产百科频道即时提供${name}房地产知识、房产百科等内容，为您提供${name}最新${categoryName}相关的知识百科，综合整理${categoryName}的知识信息。`,
        cityName: name,
        coord: `${yaxis},${xaxis}`,
      }
    },
    ['baike-detail']: (renderToStringObj) => {
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
