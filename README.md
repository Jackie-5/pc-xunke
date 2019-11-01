### 项目说明

> 此项目是基于 node + koa2 + react + antd 的多页面应用，完全支持SSR 非spa页面。项目已做拆包处理。路由为 koa-router 配置

### 项目使用方法

> 1.node版本 v11.x.x 

> 2.项目下载后 ```yarn install```

> 3.启动方式 打开一个终端先 ```npm run dev``` 启动前端项目，然后打开另一个终端 ```npm run dev:node``` 去启动node服务。

> 4.上线后使用 pm2 做服务启动方式 服务器要预装 [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/) 如果不会请自行百度。 启动方式为 ```pm2 start pm2.json```

### 目录结构说明

```
├── bin                                 // 存放前端webpack的配置
│   ├── entryfile.js
│   ├── webpack-config.js
│   └── webpack-start.js
├── client                              // 客户端文件存放位置
│   ├── compoment                       // 客户端公共组件位置
│   │   ├── carousel
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── footer
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── header
│   │       ├── index.js
│   │       └── index.less
│   ├── less                            // 公共的less文件
│   │   └── common.less
│   ├── lib                             // 公共的方法文件
│   │   └── method.js
│   └── pages                           // 页面所放的位置 对应router为 http://localhost:9090
│       └── index
│           ├── index.js
│           └── index.less
├── package.json                        
├── pm2.json                            // 启动pm2的配置
├── server                              // node服务文件夹
│   ├── client-config                   // 客户端所用到的配置文件夹，如菜单，
│   │   ├── control-menus.json          // 业务的菜单
│   ├── config                          // node所用到配置文件
│   │   ├── index.js                    // 分环境的配置
│   │   ├── node-env                    // 开发时根据NODE_ENV会读取这个文件为配置 标配为三个环境
│   │   │   ├── development.js          // 本地
│   │   │   ├── production.js           // 线上
│   │   │   └── test.js                 // 测试
│   │   └── routers                     // 配置路由，路由是由node koa-router来决定的。
│   │       ├── client                  // 客户端 非 http://localhost:9090/control/* 路由的配置 如 http://localhost:9090/login
│   │       │   ├── index.js
│   │       │   └── login.js
│   │       └── service                 // 服务端提供的接口配置 http://localhost:9090/apis/* 
│   │           └── apiRouter.js
│   ├── controllers                     // 服务端对应的业务代码
│   │   ├── apis                        // 通常放对外提供接口的文件
│   │   ├── libs                        // server的公共方法文件夹
│   │   │   ├── public-method.js
│   │   │   └── render-html.js
│   │   ├── pages                       // 非control业务的文件
│   │   │   ├── index                   // 如 http://localhost:9090 就会访问这个文件夹下的 index.js
│   │   │   │   ├── index-fetch.js
│   │   │   │   └── index.js
│   │   │   └── login                   // 如 http://localhost:9090/login 就会访问这个文件夹下的 index.js
│   │   │       ├── index-fetch.js
│   │   │       └── index.js
│   │   └── seo-config                  // 如果有seo需求，可以在此文件夹下放入seo的配置
│   │       └── index.js
│   ├── libs                            // 服务端所用到的middleware
│   │   ├── control-middleware-action
│   │   │   └── auth-menus.js
│   │   ├── middle-container
│   │   │   ├── logger-container.js
│   │   │   └── routers-middleware-hook.js
│   │   ├── middleware-page
│   │   │   ├── render-polyfill.js
│   │   │   └── render-to-string.js
│   │   ├── middlewares                 // 启动服务时会执行这里的middleware
│   │   │   ├── axios.js
│   │   │   ├── body.js
│   │   │   ├── get-env.js
│   │   │   ├── log.js
│   │   │   ├── render.js
│   │   │   ├── routers.js
│   │   │   └── throw-error.js
│   │   └── router-middleware
│   │       └── ico-ignore.js
│   ├── render-views                    // 服务端渲染时所用到的模板
│   │   ├── container.html
│   │   └── error
│   │       ├── 404.html
│   │       └── 500.html
│   ├── start.js                        // 核心启动文件
│   └── static
│       ├── axios
│       │   └── 0.18.0
│       │       └── axios.min.js
│       ├── dayjs
│       │   └── 1.8.5
│       │       ├── dayjs.min.js
│       │       └── locale
│       │           └── zh-cn.js
│       └── logo300x300.png
└── theme.js                            // antd模板的主题配置
```


### Router使用规范:

 一级目录开通需要建立Config
 > 配置规范Action Files 必须放置在controllers底下对应的一级目录下
 > EX: /controllers/shops/shopId.js


 EX:配置:
   ```
   const prefix = 'PREFIX'; // (String) url 前缀
   const routers = {
     url: '/:id', = /shop/123423" (String)
     method: 'get', (String || Array)
     action: '/controllers/shops/shopId' (String || Array)
   }
   ```

#### method: 可以是 (String | Array)
> method: ['get, 'post'];
> method: 'get';

#### Action 可以是String Array (Action业务逻辑目录地址)

> action: ['controllers/shops/middleware', 'controllers/shops/shopId']
> action: 'controllers/shops/shopId'


#### Action js 为一个Async function

 ```
 module.exports = async (ctx, next) => {
   await ctx.render('index', {
     title: 'Koa 2 indexAction/ .',
     user: 'xxx'
   });
 };
```

#### Middleware 使用方法
```
// Action middlewar Config:
 {
   url: '*',
   method: ['get', 'post'],
   action: ['/shops/shopMiddleware']
 },

 module.exports = async (ctx, next) => {
   console.log('Doing some middleware');
   await next();
 };
```
