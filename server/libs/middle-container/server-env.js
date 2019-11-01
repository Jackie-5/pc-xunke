/**
 * Created by JackieWu on 2019-07-06
 */
const fs = require('fs');
const parser = require('properties-parser');

const ENV_PATH = '/data/env';

let env = null;

/**
 * 获取服务器的appenv 配置属性
 * return Object
 * */
exports.getServerProperties = () => {
  if (env) {
    return env;
  }
  
  env = process.env.PUSHLISH_ENV || 'dev';
  
  if (fs.existsSync(ENV_PATH)) {
    try {
      const parserEnv = parser.read(ENV_PATH);
      for (let i in parserEnv) {
        env = i;
      }
    } catch (e) {
      global.xunkeObject.Log.error(`获取服务器配置文件错误 ${ENV_PATH}`);
      global.xunkeObject.Log.warn(`使用默认环境变量 ${env}`);
    }
  } else {
    global.xunkeObject.Log.error(`未读取到环境变量文件 ${ENV_PATH}`);
    global.xunkeObject.Log.warn(`使用默认环境变量 ${env}`);
  }
  
  global.xunkeObject.Log.info(`当前环境变量为： ${env}`);
  
  return env;
};

