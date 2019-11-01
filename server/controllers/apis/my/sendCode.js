/**
 * Created by JackieWu on 2019-08-23
 */

module.exports = async (ctx, next) => {
  const error = {
    code: 500,
    message: '接口错误',
    data: {},
  };
  
  if (ctx.query.imgCode) {
    const imgCode = ctx.query.imgCode.toLowerCase();
    const imgCookie = ctx.cookies.get('imgSvg');
    let code = '';
    
    if (imgCookie) {
      code = await ctx.redisGet(imgCookie);
    } else {
      error.message = '验证码已失效请刷新';
      ctx.body = error;
    }
    
    if (code && imgCode === code) {
      await ctx.redisDel(imgCode);
      if (ctx.query.mobile && ctx.query.webDomain) {
        let data = {};
        try {
          data = await ctx.state.axios('https://app02.xunkyz.com/api/clientSms/sendVerifyCode', ctx.query);
          ctx.body = {
            code: 200,
            data,
          };
          
        } catch (e) {
          ctx.logger.info(`接口错误 https://app02.xunkyz.com/api/clientSms/sendVerifyCode ${JSON.stringify(ctx.query)}`);
          error.message = '该号码当日获取验证码次数已达上限';
          ctx.body = error;
        }
      } else {
        error.message = '缺少参数';
        ctx.body = error;
      }
    } else {
      error.message = '验证码错误';
      ctx.body = error;
    }
    
  } else {
    error.message = '请填写验证码';
    ctx.body = error;
  }
  
};
