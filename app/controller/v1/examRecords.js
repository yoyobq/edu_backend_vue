// app/v1/controller/examRecords.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;

class ExamRecordsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.service.examRecords.v1.show(userId);
    if (user !== null) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;
    const result = await ctx.service.v1.examRecords.index(params);

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

  async create() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.v1.examRecords.create(params);
    // console.log(result);
    if (result.affectedRows) {
      ctx.body = null;
      ctx.status = 201;
    } else {
      ctx.body = {
        error: 'NOT IMPLEMENTED',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '试题生成失败', field: '', code: '' },
      };
      ctx.status = 501;
    }
  }
}

module.exports = ExamRecordsController;
