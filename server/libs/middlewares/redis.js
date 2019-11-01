/**
 * Created by JackieWu on 2018/7/15.
 */
const promisifyRedis = require('promisify-redis');
const { createPool } = require('generic-pool');
const { timeout } = require('promise-timeout');
const { createClient } = require('redis');
const schedule = require('node-schedule');
const dayjs = require('dayjs');
const { name } = require('../../config');

const redisSaveFn = (urlPath, options = {}) => {
  const key = [name, urlPath];
  for (const i in options) {
    key.push(options[i]);
  }
  return key.join('|');
};
let redisConnect = false;

const createRedis = async (redisConfig, logger) => {
  let client = {};
  const redisPool = createPool({
    create: () => {
      const c = createClient(
        redisConfig.port,
        redisConfig.host,
        {
          retry_strategy: (options) => {
            try {
              if (options.error.code === 'ECONNREFUSED') {
                console.log('连接被拒绝');
              }
              
              if (options.error.code === 'EHOSTDOWN') {
                logger.error('redis 连接错误');
                redisConnect = false;
              }
              
              return Math.max(options.attempt * 100, 3000);
              
            } catch (e) {
            
            }
          },
        });
      
      c.auth(redisConfig.pwd, () => {
        logger.info('redis认证密码通过');
      });
      
      c.on("ready", () => {
        logger.info(`redis ready`);
      });
      
      c.on("connect", () => {
        logger.info(`redis 连接成功`);
        redisConnect = true;
      });
      
      
      c.on("error", (err) => {
        logger.error(`redis连接失败 ${err}`);
        
      });
      
      return promisifyRedis(c);
    },
    destroy: (c) => {
      c.quit();
    },
  }, {
    max: 8, // maximum size of the pool
    min: 2, // minimum size of the pool
    idleTimeoutMillis: 2000, // minimum size of the pool
  });
  
  redisPool.on('factoryCreateError', (err) => {
    logger.error(`创建连接池 失败: ${err}`);
    redisConnect = false;
  });
  
  redisPool.on('factoryDestroyError', (err) => {
    logger.error(`销毁连接池 失败: ${err}`);
    redisConnect = false;
  });
  
  try {
    client = await redisPool.acquire();
  } catch (e) {
    logger.error('redisPool.acquire() 连接失败');
    redisConnect = false;
  }
  
  redisPool.drain().then(() => {
    logger.info('停止使用 redisPool 连接池');
    redisConnect = false;
    redisPool.clear();
  });
  
  const destroy = () => {
    redisPool.destroy(client);
  };
  
  return {
    client,
    redisPool,
    destroy,
  }
};

exports.init = async (app) => {
  const { redisConfig } = app.envLinks;
  
  const redisTimeOutCont = 2;
  // 超过10次timeout就把redis断开
  let redisTimeOutCurrent = 0;
  
  let redisPoolCreate = await createRedis(redisConfig, app.logger);
  
  const timeReload = () => {
    const format = 'YYYY-MM-DD hh:mm:ss';
    const thirtyTime = dayjs(new Date().getTime() + 60000);
    const day = thirtyTime.format('DD');
    const hour = thirtyTime.format('HH');
    const minute = thirtyTime.format('mm');
    
    redisPoolCreate.destroy();
    // 恢复次数的控制
    redisTimeOutCurrent = 0;
    
    app.logger.error(`redis已挂起 在30分钟后重启，断开时间: ${dayjs().format(format)} 下次重启时间为: ${thirtyTime.format(format)}`);
    
    const j = schedule.scheduleJob(`0 ${minute} ${hour} ${day} * *`, async () => {
      app.logger.info(`redis 已重启`);
      redisPoolCreate = await createRedis(redisConfig, app.logger);
      j.cancel();
    });
  };
  
  const cancelRedis = () => {
    if (redisTimeOutCurrent > redisTimeOutCont) {
      // 超出连接次数后 就不再去走get 和 set redis
      app.logger.error(`redis get and set timeout 超过 ${redisTimeOutCont}次, redis挂起`);
      timeReload();
    }
    redisTimeOutCurrent = redisTimeOutCurrent += 1;
  };
  
  
  return async (ctx, next) => {
    ctx.redisClient = redisPoolCreate.client;
    
    ctx.redisSet = async (key, value, options = {}) => {
      if (redisConnect) {
        const expire = options.expire ? options.expire : 3600 * 12;
        try {
          await timeout(ctx.redisClient.set(key, JSON.stringify(value)), options.time ? options.time : 5000);
          // expire 过期时间
          ctx.redisClient.expire(key, expire);
          ctx.logger.info(`[redis-client] SET success ${key} 过期时间: ${expire}ms`);
          // 如果连接成功了 那么就不去计数超时
          redisTimeOutCurrent = 0;
        } catch (e) {
          ctx.logger.error(`[redis-client] SET timeout: ${key}`);
          // 每次超时都去计数
          cancelRedis();
        }
      }
    };
    
    ctx.redisGet = async (key, time = 5000) => {
      let returnObject = null;
      if (redisConnect) {
        try {
          returnObject = await timeout(ctx.redisClient.get(key), time);
          returnObject = JSON.parse(returnObject);
          // 如果连接成功了 那么就不去计数超时
          redisTimeOutCurrent = 0;
          ctx.logger.info(`[redis-client] GET success ${key}`);
        } catch (e) {
          ctx.logger.error(`[redis-client] GET timeout ${key}`);
          cancelRedis();
        }
      }
      return returnObject;
    };
    
    ctx.redisSaveFn = redisSaveFn;
    
    await next();
  };
};
