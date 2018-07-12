// app/v1/controller/moduleApplyRecords.js
'use strict';

const Controller = require('egg').Controller;
class ModuleApplyRecordsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.v1.moduleApplyRecords.show(id);
    if (result !== null) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        detail: { message: '申请记录id:' + id + '不存在', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }
  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;
    if (params.modId !== undefined) {
      params.modId = parseInt(params.modId);
    }
    if (params.status !== undefined) {
      params.status = params.status.split(',');
    }
    // console.log(params);
    const result = await ctx.service.v1.moduleApplyRecords.index(params);
    // console.log(result[0] !== undefined);
    // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '申请记录列表不存在', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }
  async update() {
    const ctx = this.ctx;

    const row = JSON.parse(ctx.query.params);

    // console.log(row);
    const result = await ctx.service.v1.moduleApplyRecords.update(row);

    if (result.affectedRows) {
      ctx.status = 204;
    }
  }

  async create() {
    const ctx = this.ctx;
    const params = JSON.parse(ctx.query.params);
    // console.log(params);
    const searchParams = {
      uId: params.uId,
      modId: params.modId,
      type: params.type,
    };
    const primaryKeyCheck = await ctx.service.v1.moduleApplyRecords.index(searchParams);
    if (primaryKeyCheck[0] === undefined) {
      const result = await ctx.service.v1.moduleApplyRecords.create(params);
      // console.log(result);
      if (result.affectedRows) {
        ctx.body = null;
        ctx.status = 201;
      } else {
        ctx.body = {
          error: 'NOT IMPLEMENTED',
          // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
          // 因此把他简化成了一个对象 {}
          detail: { message: '申请记录添加失败', field: '', code: '' },
        };
        ctx.status = 501;
      }
    } else {
      ctx.body = {
        error: 'NOT IMPLEMENTED',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '该申请已存在', field: '', code: '' },
      };
      ctx.status = 403;
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const params = JSON.parse(ctx.query.params);
    console.log(params);
    let row = {};
    if (params.id !== undefined) {
      row = {
        id: parseInt(params.id),
      };
    } else if (params.uId !== undefined) {
      row = {
        uId: parseInt(params.uId),
      };
    }
    console.log(row);
    const result = await ctx.service.v1.moduleApplyRecords.destroy(row);
    if (result.affectedRows) {
      ctx.body = null;
      ctx.status = 201;
    } else {
      ctx.body = {
        error: 'NOT IMPLEMENTED',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '申请撤销失败', field: '', code: '' },
      };
      ctx.status = 501;
    }
  }
}

module.exports = ModuleApplyRecordsController;
