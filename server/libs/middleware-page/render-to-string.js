/**
 * Created by Jackie.Wu on 2018/7/17.
 */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import path from 'path';
import config from '../../config';
import menus from '../../controllers/config/menu.json';

export default async (options = {}) => {
  const { params = {}, pageName, ctx } = options;
  const { envLinks, currentCity, clientPath, basisCurrentDomain } = ctx.state;
  const { pathname } = envLinks;
  // 每个页面都有menu 去过滤 当前页面是哪个页面
  menus.forEach((item) => {
    item.active = ctx.path.includes(item.url);
  });

  const render = {
    container: '',
    initState: {
      currentCity,
      domainDetail: basisCurrentDomain,
      ...params,
      menus,
    },
    clientPath: '',
    iconfontCss: config.iconfontCss,
  };
  // 查找对应的router
  if (Array.isArray(clientPath)) {
    clientPath.forEach((item) => {
      if (item.name === pageName) {
        ctx.logger.info(JSON.stringify(item));
        if (item.clientPage) {
          render.clientPage = `${pathname}/${item.clientPage}`;

          const ReactTem = require(`${path.join(process.cwd(), 'client', item.clientPage)}.js`);
          render.container = renderToStaticMarkup(<ReactTem {...render.initState} />);

        } else {
          ctx.throw(500, '静态js文件路径找不到, 或者react的入口文件找不到');
        }

      }
    });
  } else if (typeof clientPath === 'object') {
    if (clientPath.clientPage) {
      render.clientPage = `${pathname}/${clientPath.clientPage}`;

      const ReactTem = require(`${path.join(process.cwd(), 'client', clientPath.clientPage)}.js`);
      render.container = renderToStaticMarkup(<ReactTem {...render.initState} />);

    } else {
      ctx.throw(500, '静态js文件路径找不到, 或者react的入口文件找不到');
    }

  } else {
    ctx.throw(500, 'router clientPath 错误，既不是Array 也不是 Object');
  }

  return render;
};
