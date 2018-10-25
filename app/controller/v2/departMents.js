// app/v2/controller/departMents.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;

class DepartMentsController extends Controller {

  async show() {
    const ctx = this.ctx;
    // const userId = ctx.params.id;
    // console.log(typeof ctx.query);
    const row = ctx.query;
    const user = await ctx.service.v2.departMents.show(row);
    // if (user !== null) {
    //   ctx.body = user;
    //   ctx.status = 200;
    // } else {
    //   ctx.status = 404;
    // }
    ctx.body = user;
    ctx.status = 200;
  }

  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;

    // 没有全文列表的需求，因此只处理带参数的情况
    if (JSON.stringify(params.departmentName) !== undefined) {
      const result = await ctx.service.v2.departMents.index(params);
      // console.log(result);
      // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
      if (result[0] !== undefined) {
        ctx.body = result;
        ctx.status = 200;
      } else {
        ctx.throw(404, params.departmentName + '并不存在，请检查输入或联系网站管理员');
      }
    } else {
      ctx.throw(400, '参数不正确');
    }
  }
}

module.exports = DepartMentsController;
