// app/v1/controller/modules.js
'use strict';

const Controller = require('egg').Controller;
class ModulesController extends Controller {

  async show() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.v1.modules.show(id);
    if (result !== null) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        detail: { message: '课程id:' + id + '不存在', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }
  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    let params = ctx.query;
    let result = [];
    // console.log(params);
    if (params.spec) {
      result = await ctx.service.v1.modules.getThisStuWork(params.uId);
    } else {
      if (params.status1) {
        const status = [];
        status[0] = params.status1;
        status[1] = params.status2;
        params = {
          status,
        };
      // console.log(params);
      }
      result = await ctx.service.v1.modules.index(params);
    }

    // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '课程列表不存在', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }

  async update() {
    const ctx = this.ctx;
    // console.log(ctx.params);
    const row = JSON.parse(ctx.query.params);
    const result = await ctx.service.v1.modules.update(row);
    if (result.affectedRows) {
      ctx.status = 204;
    }
  }

  async create() {
    const ctx = this.ctx;
    const row = JSON.parse(ctx.query.params);
    const result = await ctx.service.v1.modules.create(row);
    if (result.affectedRows) {
      ctx.status = 201;
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const params = JSON.parse(ctx.query.params);
    // console.log(params);

    const result = await ctx.service.v1.modules.destroy(params);
    if (result.affectedRows) {
      ctx.body = null;
      ctx.status = 201;
    } else {
      ctx.body = {
        error: 'NOT IMPLEMENTED',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '课程删除成功', field: '', code: '' },
      };
      ctx.status = 501;
    }
  }
}

module.exports = ModulesController;
