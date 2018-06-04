'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/:id', controller.user.info);

  //                            对象名   路由url         绑定控制器
  // app.router.resources('topics', '/api/v2/topics', app.controller.topics);
  // 由于 const {} = app 的存在应该可以等价于
  router.resources('users', '/api/v1/users', controller.v1.users);

};
