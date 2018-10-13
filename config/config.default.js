'use strict';

module.exports = appInfo => {
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'alex',
        password: 'alex1mysql',
        database: 'platform',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },

    // 以下部分代码来源是 egg.js 官方文档中对 RESTful 接口设计中返回 error 时
    // 做统一处理的中间件，但由于官方文档中是从另一个网站获取数据，而这个网站，
    // 是从mysql数据库获取数据，错误获取方式不同，无法通用，因此废弃，留供参考
    // // 加载 errorHandler 中间件
    middleware: [ 'errorHandler', 'validateHandler' ],
    // // 只对 /api 前缀的 url 路径生效
    validateHandler: {
      // enable: true,
      match: '/api/v2',
    },
    errorHandler: {
      match: '/api/v2',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525747116764_6024';

  // add your config here
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  // 也可在路由中添加中间件 数据api v2 中间件目前添加在router.js中
  // config.middleware = [ 'validateHandler' ];
  return config;
};
