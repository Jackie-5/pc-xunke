/**
 * Created by JackieWu on 2019/4/27.
 */

const _ = require('lodash');

module.exports = {
  baikeCategory: async (ctx) => {
    const { envLinks, currentCity, basisCurrentDomain, debugData } = ctx.state;
    const cateParams = {
      code: 'baike',
      domain: basisCurrentDomain.domain,
      cityCode: currentCity.id,
    };
    const redisCate = ctx.redisSaveFn('queryAllDataDictToCForShow', cateParams);

    let result = await ctx.redisGet(redisCate);

    if (!result) {
      result = [];
      try {
        const data = await ctx.state.axios(`${envLinks.toCHost}/queryAllDataDictToCForShow`, cateParams, {
          method: 'post',
        });

        if (data.data) {

          const sortData = _.sortBy(data.data, (item) => {
            return item.id;
          });


          sortData.forEach((item) => {
            item.id = `0${item.id}`;
            if (item.childs && item.childs.length > 0) {
              item.childs.forEach((it) => {
                it.id = `00${it.id}`;
              })
            }
            result.push(item);
          });

          await ctx.redisSet(redisCate, result);
        }

        debugData('baikeCate', data);

      } catch (e) {
        ctx.throw(500, `baikeCategory方法下 接口返回错误 queryAllDataDictToCForShow ${e}`);
      }
    }

    return result;
  },

  getMainList: async (ctx) => {
    const { envLinks, basisCurrentDomain, currentCity, debugData } = ctx.state;
    try {
      const getData = await ctx.state.axios(`${envLinks.toCHost}/baike/queryArticleLabels`, {
        cityCode: currentCity.id,
        domain: basisCurrentDomain.domain,
      }, {
        method: 'post'
      });

      debugData('queryArticleLabels', getData);

      return getData.data;

    } catch (e) {
      ctx.throw(500, `接口返回错误 /baike/queryArticleLabels ${e}`);
    }
  },

  newBaikeList: async (ctx, detailParentCode) => {
    const { envLinks, debugData, basisCurrentDomain, currentCity } = ctx.state;
    const { code, page } = ctx.params;
    const axisoParams = {
      rows: 8,
      cityCode: currentCity.id,
      start: 0,
      domain: basisCurrentDomain.domain,
    };

    if (detailParentCode) {
      axisoParams.parentCode = detailParentCode
    } else {

      if (code) {
        // 规则，当前两位是 00 时，那么是子分类
        if (Number(code)) {
          if (code.slice(0, 2).toString() === '00') {
            axisoParams.code = code.toString().replace('00', '');
          } else if (code.slice(0, 1).toString() === '0') {
            // 规则，当前一位是 0 时，那么是父分类
            axisoParams.parentCode = code.toString().replace('0', '');
          }
          axisoParams.rows = 15;
        } else if (code.includes('rs')) {
          axisoParams.title = code.split('rs')[1];
          axisoParams.rows = 15;
        }
      }

      if (page) {
        axisoParams.start = Number(page.split('pg')[1]) < 2 ? 0 : Number(page.split('pg')[1]) - 1;
      }
    }

    try {
      const data = await ctx.state.axios(`${envLinks.toCHost}/baike/query-article`, axisoParams, {
        method: 'post'
      });

      debugData('baikeLis1t', data);


      return data.data;
    } catch (e) {
      ctx.throw(500, `接口返回错误 /baike/query-article ${e}`);
    }
  },
  detailBaike: async (ctx) => {
    const { envLinks, debugData } = ctx.state;
    try {
      const code = ctx.params.code && ctx.params.code.includes('.html') && ctx.params.code.split('.html')[0];

      const data = await ctx.state.axios(`${envLinks.toCHost}/baike/get-article-detail`, {
        id: code,
      });

      debugData('detailBaike', data);

      return data.data ? data.data : {};
    } catch (e) {
      ctx.throw(500, `接口返回错误 /baike/get-article-detail ${e}`);
    }
  },
};

