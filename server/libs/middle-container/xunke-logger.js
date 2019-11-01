/**
 * Created by JackieWu on 2019-07-06
 */

const path = require('path');
const log4js = require('log4js');
const LOG_DIR = '/data/logs';

/**
 * @func
 * @desc 初始化Log的文件
 * @param {object} options - log api的参数项
 * @param {string} options.appName - 当前服务的名字
 * @param {array} options.category - log所生成级别的列表
 * @param {number} options.backups - 日志在服务器上保留多少天,默认30天
 * @param {boolean} options.compress - 生成日志时是否要把之前的文件打包成 gz的文件
 * @return {object} 返回当前category所生成的日志方法
 */

class LoggerInfo {
  constructor(options = {}) {
    this.appName = options.appName;
    this.category = options.category || [ 'info', 'warn', 'error', 'debug' ];
    this.compress = options.compress || true;
    this.backups = options.backups || 30;
  }
  
  initConfigs = () => {
    const getLogger = {};
    const appenders = {};
    const categories = {};
    const logger = {};
    this.category.forEach((item) => {
      // 输出到日志文件里
      appenders[ `${ item }_file` ] = {
        type: 'file',
        encoding: 'utf-8',
        filename: path.join(LOG_DIR, this.appName, `${ item }.log`),
        backups: this.backups,
        compress: true,
        layout: {
          type: 'pattern',
          // 用于配置输出的内容信息
          pattern: `{"message": "%m", "level": "%p", "app_id": "${ this.appName }", "time": "%d{yyyy-MM-dd hh:mm:ss.SSS"}}`,
        }
      };
      // // 输出到控制台
      appenders[ `${ item }` ] = {
        type: 'stdout',
        layout: {
          type: 'pattern',
          // 用于配置输出的内容信息
          pattern: '%[%d{yyyy-MM-dd hh:mm:ss} - [%c]%] %m',
        }
      };
      
      categories[ item ] = {
        appenders: [ `${ item }_file`, item ],
        level: item,
      };
      
      
      getLogger[ item ] = log4js.getLogger(item);
      // 最后return 出去的是可执行的 三种方法
      logger[ item ] = (message) => {
        getLogger[ item ][ item ](message);
      };
      
    });
    // 默认加上default 否则会报错
    categories.default = {
      appenders: this.category,
      level: 'info',
    };
    
    log4js.configure({
      pm2: true,
      pm2InstanceVar: `INSTANCE_ID_${this.appName}`,
      appenders,
      categories,
    });
    
    return logger;
  }
}

module.exports = (options = {}) => {
  if (options.appName) {
    const Logger = new LoggerInfo(options);
    return Logger.initConfigs();
  } else {
    console.error('没有可用的 appName')
  }
};