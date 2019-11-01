
export default (ctx) => {
  const {name, longitude, latitude} = ctx.state.currentCity;
  return {
    ['ditu-main']: (renderToStringObj) => {
      return {
        title: `${name}房产百科_${name}房产知识_${name}房地产百科网-${name}${renderToStringObj.initState.urlToName}`,
        keywords: `${name}房产百科,${name}房产知识,${name}房地产百科网,${name}${renderToStringObj.initState.urlToName}`,
        description: `${renderToStringObj.initState.urlToName}${name}房产百科频道即时提供${name}房地产知识、${name}房产百科，为您提供${name}最新房产相关的知识百科，综合整理买房必看的知识信息。`,
        cityName: name,
        coord: `${longitude},${latitude}`,
      }
    },
  }
}