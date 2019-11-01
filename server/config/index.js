/**
 * Created by JackieWu on 2018/7/15.
 */
const path = require('path');
const domainConfig = require('./domain-config');
const { name } = require('../../package.json');

module.exports = Object.assign({
    name,
    port: 13000,
    clientPort: 13001,
    STATIC_DIR: path.join(process.cwd(), 'client'),
    DIST_STATIC: path.join(process.cwd(), 'dist'),
    CLIENT_ROUTER: {
      configDir: 'server/config/routers/client',
      actionDir: 'server/controllers'
    },
    SERVICE_ROUTER: {
      configDir: 'server/config/routers/service',
      actionDir: 'server/controllers'
    },
    LOG_DIR: `/data/logs`,
    iconfontCss: '//at.alicdn.com/t/font_757076_xsakxinymbp.css',
    viewDir: '/server/render-views',
    redisConfig: {
      pwd: '!re!di!s!',
      port: 18103,
      host: '106.14.17.39',
      expire: 3600,
    },
    seoImg: {
      logo: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/xunke-logo-t-b.png',
      defaultImg1: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/seo-default1.jpg',
      defaultImg2: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/seo-default2.jpg',
      defaultImg3: 'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/ershoufang-list.jpg',
    },
  },
  domainConfig,
);


