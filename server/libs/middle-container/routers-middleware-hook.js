/**
 * Created by JackieWu on 2019/1/14.
 */
const getCityAll = require('../router-middleware/get-all-city');
const getCityMiddleware = require('../router-middleware/get-current-city');
const getCurrentDomain = require('../router-middleware/get-current-domain');
const getUser = require('../router-middleware/get-user');
const ignore = require('../router-middleware/ico-ignore');
const ping = require('../router-middleware/ping');

module.exports = (prefix) => {
  const arr = [ ignore, ping, getCurrentDomain, getUser ];
  if (prefix !== '/api') {
    arr.push(getCityAll, getCityMiddleware);
  }

  return arr;
};
