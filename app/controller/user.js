/*
**  这是一个从数据库获取数据的例子service例子，
**  对应的controller 是 controller/user.js
**  需要注意的是，这个例子不能用于RESTful接口使用
**  仅用于观察controller如何起效而存在
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
