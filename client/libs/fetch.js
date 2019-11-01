import axios from 'axios';

const fetch = (url, params = {}, options, body = {}) => {
  const config = Object.assign({
    url: url,
    method: 'get',
    headers: {},
  }, options);
  switch (config.method) {
    case 'get': {
      config.params = params;
      break;
    }
    case 'post':
    case 'put':
    case 'patch': {
      if (options.isFrom) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.transformRequest = [function (data) {
          // Do whatever you want to transform the data
          let ret = '';
          for (let it in params) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
          }
          return ret
        }]
      } else {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      }
      config.data = body;
      break;
    }
    default: {
      break;
    }
  }
  return new Promise((resolve, reject) => {
    axios(config).then(function (response) {
      resolve(response.data);
    }).catch(function (error) {
      reject(error);
    });
  });
};

export default fetch;
