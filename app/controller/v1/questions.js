// app/v1/controller/questions.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;

class QuestionsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.service.questions.v1.show(userId);
    if (user !== null) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.v1.questions.index(params);

    // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '用户不存在或密码有误', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }
}

module.exports = QuestionsController;
