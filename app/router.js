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
  router.resources('authentications', '/api/v1/authentications', controller.v1.authentications);
  router.resources('examRecords', '/api/v1/examRecords', controller.v1.examRecords);
  router.resources('accounts', '/api/v1/accounts', controller.v1.accounts);
  router.resources('accounts', '/api/v1/classes/:classId/examLists', controller.v1.examLists);

  router.resources('users', '/api/v1/users', controller.v1.users);
  // router.resources('tests', '/api/v1/examRecords/:id/password', controller.v1.password);
};
