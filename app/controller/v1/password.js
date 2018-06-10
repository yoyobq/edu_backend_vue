// app/controller/password.js
'use strict';

const Controller = require('egg').Controller;

class PasswordController extends Controller {
  async show() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    // console.log(userId);
    const user = await ctx.service.password.v1.show(userId);
    if (user !== null) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    console.log(ctx);
    const users = await ctx.service.v1.password.index();
    if (users !== null) {
      console.log(users);
      ctx.body = users;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = '未找到该用户或密码不匹配';
    }
  }
}

module.exports = PasswordController;
