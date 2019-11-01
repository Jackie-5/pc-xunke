/**
 * Created by JackieWu on 2019-10-27
 */

module.exports = async (options = {}) => {
  const { domain, ctx } = options;
  const { ENV, axios, envLinks } = ctx.state;

  let defaultDomain = 'www.yuanhaowang.com';
  if (ENV !== 'dev') {
    defaultDomain = domain;
  }

  const basisCurrentDomainKey = ctx.redisSaveFn('/customer/queryCompany', { domain: defaultDomain });

  let companyInfo = await ctx.redisGet(basisCurrentDomainKey);
  // let companyInfo = null;

  if (!companyInfo) {
    try {
      companyInfo = await axios(`${envLinks.toCHost}/customer/queryCompany`, {
        domain: defaultDomain,
      }, {
        method: 'post',
      });

      await ctx.redisSet(basisCurrentDomainKey, companyInfo);
    } catch (e) {
      ctx.logger.error(`获取公司信息错误 ${envLinks.toCHost}/customer/queryCompany ${{ domain: defaultDomain }}`);
    }

  }


  const { switchboardPhone, recordNum, logoUrl, companyName, domainName } = companyInfo.data;

  return {
    companyName,
    switchboardPhone,
    ipc: recordNum,
    logo: logoUrl,
    domainName,
    domain: defaultDomain,
  };

};


