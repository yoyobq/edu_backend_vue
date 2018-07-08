// app/v1/controller/scoreLists.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;

class ScoreListsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const data = {
      id: ctx.params.uid,
      exam_id: ctx.params.id,
    };
    const result = await ctx.service.v1.scoreLists.show(data);
    // console.log(result);
    if (result !== null) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        detail: { message: '未找到与之关联的考试记录', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    const params = {
      id: parseInt(ctx.params.uid),
      exam_id: parseInt(ctx.query.exam_Id),
    };

    const result = await ctx.service.v1.scoreLists.index(params);
    // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        detail: { message: '考试记录失效，请重新登录', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      id: ctx.params.uid,
      exam_id: ctx.query.examId,
    };
    const result = await ctx.service.v1.scoreLists.create(params);
    if (result.affectedRows) {
      ctx.body = null;
      ctx.status = 201;
    } else {
      ctx.body = {
        error: 'NOT IMPLEMENTED',
        detail: { message: '考试记录生成失败', field: '', code: '' },
      };
      ctx.status = 501;
    }
  }

  async update() {
    const ctx = this.ctx;
    const params = {
      sco_score: ctx.query.sco_score,
      sco_id: ctx.params.id,
    };
    console.log(params);
    const result = await ctx.service.v1.scoreLists.update(params);
    if (result.affectedRows) {
      ctx.body = null;
      ctx.status = 201;
    } else {
      ctx.body = {
        error: 'NOT IMPLEMENTED',
        detail: { message: '考试成绩登记失败', field: '', code: '' },
      };
      ctx.status = 501;
    }
  }
}

module.exports = ScoreListsController;
