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
    // console.log(ctx.query.realName);
    let row = {};
    if (ctx.query.realName === undefined) {
      let timeStr = (new Date()).toLocaleString();
      // 获取当前日期
      timeStr = timeStr.replace(/\//g, '-');
      // 替换2017/05/03 为    2017-05-03
      row = {
        id: ctx.params.id,
        lastLoginTime: timeStr,
        lastLoginIP: ctx.request.header['x-forwarded-for'],
      };
    } else {
      // console.log(ctx.query.realName);
      let permit;
      if (ctx.query.type === 'Teacher') {
        permit = '[{"status":"Teacher"}]';
      } else {
        permit = '[{"status":"Assitant", "module":1}]';
      }


      row = {
        id: ctx.params.id,
        realName: ctx.query.realName,
        permission: permit,
      };
    }

    const result = await ctx.service.v1.accounts.update(row);

    if (result.affectedRows) {
      ctx.status = 204;
    }
  }
}

module.exports = AccountsController;
