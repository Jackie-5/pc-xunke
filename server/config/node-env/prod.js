/**
 * Created by JackieWu on 2018/7/15.
 */

module.exports = {
  pathname: `https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/frontend/prod/pc-xunke/dist`,
  toCHost: 'http://maintob.mayij.cn/backend/toc',
  oldXunkeLink: 'https://app02.xunkyz.com/api',
  react: {
    react: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/react/react16.8.6.production.min.js',
    reactDom: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/react/react-dom16.8.6.production.min.js',
  },
  axios: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/axios.prod.0.18.0.js',
  dayjs: {
    dayjs: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/dayjs.1.8.5.min.js',
    dayjsCn: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/dayjs.zh-cn.1.8.5.js',
  },
  lodash: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/lodash.core.4.17.12-pre.min.js',
  redisConfig: {
    pwd: '!re!di!s!',
    port: 7379,
    host: '172.19.200.8',
    expire: 3600,
  },
};

