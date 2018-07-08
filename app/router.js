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
  router.resources('questions', '/api/v1/questions', controller.v1.questions);
  router.resources('examRecords', '/api/v1/examRecords', controller.v1.examRecords);
  router.resources('accounts', '/api/v1/accounts', controller.v1.accounts);
  router.resources('informations', '/api/v1/informations', controller.v1.informations);
  router.resources('modules', '/api/v1/modules', controller.v1.modules);
  router.resources('moduleApplyRecords', '/api/v1/moduleApplyRecords', controller.v1.moduleApplyRecords);
  router.resources('examLists', '/api/v1/classes/:classId/examLists', controller.v1.examLists);
  router.resources('scoreLists', '/api/v1/accounts/:uid/scoreLists', controller.v1.scoreLists);

  // 也就是说允许殊途同归的路由，待议
  router.resources('scores', '/api/v1/accounts/:uid/scores', controller.v1.scores);
  router.get('scores', '/api/v1/scores/wrong', controller.v1.scores.wrong);

  // 有意思的问题，下面这个路由，由于匹配上面那条 /api/v1/examRecords 会给自动拦截掉
  // 好像也没啥好的解决方案，只能把count写到 index的 params里面去了
  // router.get('/api/v1/examRecords/count', controller.v1.examRecords.count);

  router.resources('users', '/api/v1/users', controller.v1.users);
  // router.resources('tests', '/api/v1/scoreLists/:id/password', controller.v1.password);
};
