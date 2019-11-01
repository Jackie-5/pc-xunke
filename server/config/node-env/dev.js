/**
 * Created by JackieWu on 2018/7/15.
 */
const config = require('../index');
const ip = require('ip');
module.exports = {
  pathname: `http://${ip.address()}:${config.clientPort}`,
  toCHost: 'http://maintob.beta.mayij.cn/backend/toc',
  oldXunkeLink: 'https://app02.xunkyz.com/api',
  react: {
    react: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/react/react.16.8.6.development.js',
    reactDom: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/react/react-dom.16.8.6.development.js',
  },
  axios: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/axios.prod.0.18.0.js',
  dayjs: {
    dayjs: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/dayjs.1.8.5.min.js',
    dayjsCn: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/dayjs.zh-cn.1.8.5.js',
  },
  lodash: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_to_c/public_js/lodash.core.4.17.12-pre.min.js',
  redisConfig: {
    pwd: '',
    port: 6379,
    host: '192.168.1.105',
    expire: 3600,
  },
};
