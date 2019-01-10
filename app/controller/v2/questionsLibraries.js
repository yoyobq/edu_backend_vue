// app/v2/controller/questionsInfos.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;

class QuestionsLibrariesController extends Controller {
  async show() {
    const ctx = this.ctx;
    const params = ctx.params;
    // console.log(params);
    const result = await ctx.service.v2.questionsLibraries.show(params);
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
    const result = await ctx.service.v2.questionsLibraries.index(params);

    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.throw(404, '未找到题库的相关信息，请检查输入');
    }
  }
}

module.exports = QuestionsLibrariesController;
