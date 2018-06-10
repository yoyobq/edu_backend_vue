// app/v1/controller/accounts.js
'use strict';

const Controller = require('egg').Controller;

class AccountsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.v1.accounts.show(id);
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

  async update() {
    const ctx = this.ctx;
    let timeStr = (new Date()).toLocaleString();
    // 获取当前日期
    timeStr = timeStr.replace(/\//g, '-');
    // 替换2017/05/03 为    2017-05-03

    const row = {
      id: ctx.params.id,
      lastLoginTime: timeStr,
      lastLoginIP: ctx.request.header['x-forwarded-for'],
    };

    const result = await ctx.service.v1.accounts.update(row);

    if (result.affectedRows) {
      ctx.status = 204;
    }
  }
}

module.exports = AccountsController;
