// app/v2/controller/questions.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;

class QuestionsController extends Controller {
  async show() {
    const ctx = this.ctx;
    const params = ctx.params;
    // console.log(params);
    const result = await ctx.service.v2.questions.show(params);
    if (result !== null) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.throw('获取信息失败，请检查日志');
    }
  }
  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;
    // console.log(params.limit);
    let result;
    if (params.limit === undefined) {
      result = await ctx.service.v2.questions.index(params);
    } else {
      result = await ctx.service.v2.questions.limitIndex(params.queG_id, params.limit);
    }

    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.throw(404, '未找到题库的相关信息，请检查输入');
    }
  }
}

module.exports = QuestionsController;
