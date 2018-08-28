// app/v1/controller/appointLists.js
'use strict';

const Controller = require('egg').Controller;

class AppointListsController extends Controller {
  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;
    // console.log(params);
    const result = await ctx.service.v1.appointLists.index(params);
    // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '用户详细信息列表不存在', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }
}

module.exports = AppointListsController;
