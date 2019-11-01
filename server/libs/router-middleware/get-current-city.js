/**
 * Created by JackieWu on 2019/1/14.
 */
const { cloneDeep } = require('lodash');
const { getCurrentCity } = require('../../controllers/libs/public-method');

const validCity = (cityList, cityKey) => {
  let vaild = false;
  cityList.forEach((item) => {
    if (cityKey === item.firstLetters) {
      vaild = true;
    }
  });
  return vaild;
};

const redirect = (ctx, host) => {
  ctx.status = 301;
  ctx.redirect(host);
};

module.exports = async (ctx, next) => {
  const { protocol, host, path } = ctx;
  const { cityList, ENV } = ctx.state;
  // 如果是
  ctx.state.firstHost = 'www';
  if (cityList.length > 0) {
    if (ENV === 'dev' && host.includes('localhost')) {
      const cloneCity = cloneDeep(cityList)[0];
      delete cloneCity.childs;
      ctx.state.firstHost = cloneCity.firstLetters;
      ctx.state.currentCity = cloneCity;
      ctx.cookies.set('city', encodeURIComponent(JSON.stringify(ctx.state.currentCity)));
    } else {
      const h = cloneDeep(host).split('.');
      const splice = h.splice(0, 1);
      if (splice.includes('www')) {
        if (path) {
          // 如果是www 进来的 并且有path 那么就去查看是否有cookie，如果有cookie 那么就跳转到对应城市的path页面
          try {
            if (ctx.cookies.get('city')) {
              const city = JSON.parse(decodeURIComponent(ctx.cookies.get('city')));
              ctx.redirect(`${protocol}://${city.firstLetters}.${h.join('.')}${path}`);
            }
          } catch (e) {
            // city 解析错误 就跳转回来
            redirect(ctx, `${protocol}://${host}`);
          }
          redirect(ctx, `${protocol}://${host}`);
        }
      } else {
        ctx.state.firstHost = host.split('.')[0];
      }
    }

    if (ctx.state.firstHost === 'www') {
      // 如果是www 那么就往下走 进入到业务middleware
      await next();
    } else {
      // 如果是城市 那么去校验城市是否存在 如果存在 存cookie 往下走
      if (validCity(cityList, ctx.state.firstHost)) {
        ctx.state.currentCity = getCurrentCity(cityList, ctx.state.firstHost);
        ctx.cookies.set('city', encodeURIComponent(JSON.stringify(ctx.state.currentCity)));
        await next();
      } else {
        // 如果没有城市那么301跳回城市首页
        redirect(ctx, `${protocol}://www.${h.join('.')}`);
      }
    }
  } else {
    await next();
  }






  // 查看当前host是否有城市标识


  // if (ENV === 'dev') {
  //   const cloneCity = _.cloneDeep(cityList)[0];
  //   delete cloneCity.childs;
  //   cityFirstLetters = cloneCity.firstLetters;
  //   ctx.state.currentCity = cloneCity;
  //   ctx.cookies.set('city', encodeURIComponent(JSON.stringify(ctx.state.currentCity)));
  // } else if (host.split('.')[0].includes('www')) {
  //   // 如果不是dev 并且输入了WWW 那么就做一下跳转
  //   const h = host.split('.');
  //   let cityFirst = '';
  //   h.splice(0, 1);
  //
  //   if (ctx.cookies.get('city')) {
  //     try {
  //       cityFirst = JSON.parse(decodeURIComponent(ctx.cookies.get('city')));
  //     } catch (e) {
  //       ctx.logger.warn('处理cookie city 错误');
  //     }
  //   } else {
  //     cityFirst = cityList[0];
  //   }
  //
  //   ctx.redirect(`${ctx.protocol}://${cityFirst.firstLetters}.${h.join('.')}${ctx.path}`);
  //
  // } else {
  //   if (host.split('.')[0]) {
  //     cityFirstLetters = host.split('.')[0];
  //   }
  // }
  //
  // // 验证当前的 cityFirstLetters 是否为开通的城市

};

