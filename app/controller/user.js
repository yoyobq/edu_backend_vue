/*
**  这是一个从数据库获取数据的例子service例子，
**  对应的controller 是 controller/user.js
*/

// app/controller/user.js
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.service.user.find(userId);
    // const user = await ctx.service.user.find();
    ctx.body = user;
  }
}

module.exports = UserController;
