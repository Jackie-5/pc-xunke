/**
 * Created by JackieWu on 2019-08-23
 */

const svgCaptcha = require('svg-captcha');
const btoa = require('btoa');
const md5 = require('md5');

module.exports = async (ctx, next) => {
  const c = svgCaptcha.create({
    size: 4,
    noise: 2,
    color: false,
    background: '#fff',
    width: 200,
    height: 70,
  });
  
  let imgSvg = ctx.cookies.get('imgSvg');
  console.log(ctx.headers.origin)
  ctx.cookies.set('test', '11111');
  if (!imgSvg) {
    imgSvg = md5(c.text + Math.random());
    ctx.cookies.set('imgSvg', imgSvg, {
      domain: ctx.headers.origin,
      path: '/',
      httpOnly: true,
      maxAge: 120 * 1000,
    });
  
    
  }
  // 1分钟过期。
  await ctx.redisSet(imgSvg, c.text.toLowerCase(), {
    expire: 60,
  });
  
  ctx.body = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(c.data)))}`;
  
};
