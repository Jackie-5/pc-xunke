/**
 * Created by JackieWu on 2018/7/15.
 */
const fs = require('fs');
const mkdirp = require('mkdirp');

const writeFile = (backendName, data) => {
  fs.writeFile(`./backendJson/${backendName}.json`, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) throw err;
    console.log('done');
  });
};

exports.init = async (app) => {
  return async (ctx, next) => {
    ctx.state.debugData = (backendName, data) => {
      if (ctx.state.ENV === 'dev') {
        const dir = `${process.cwd()}/backendJson`;
        fs.exists(dir, function(exists){
          if(!exists){
            mkdirp(dir, function (err) {
              if (err) ctx.throw(500, '创建目录失败');
              writeFile(backendName, data);
            });
          } else {
            writeFile(backendName, data);
          }
        });
      }
    };
    await next();
  };
};
