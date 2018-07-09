// app/v1/controller/informations.js
'use strict';

const Controller = require('egg').Controller;

class InformationsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.v1.informations.show(id);
    if (result !== null) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        detail: { message: '用户不存在或密码有误', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;
    // console.log(params);
    const result = await ctx.service.v1.informations.index(params);
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

  async update() {
    const ctx = this.ctx;

    const row = {
      id: ctx.params.id,
      realName: ctx.query.realName,
      department: ctx.query.department,
      school: ctx.query.school,
      highestDegree: ctx.query.highestDegree,
      email: ctx.query.email,
      cellphone: ctx.query.cellphone,
    };

    // console.log(row);
    const result = await ctx.service.v1.informations.update(row);

    if (result.affectedRows) {
      ctx.status = 204;
    }
  }
}

module.exports = InformationsController;
