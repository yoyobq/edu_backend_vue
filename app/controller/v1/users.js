// app/controller/users.js
'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
//   async info() {
//     const ctx = this.ctx;
//     const userId = ctx.params.id;
//     const user = await ctx.service.user.find(userId);
//     // const user = await ctx.service.user.find();
//     ctx.body = user;
//   }
// }

// module.exports = UserController;
  async show() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const users = await ctx.service.users.show(userId);
    ctx.body = users;
    ctx.status = 200;
  }

  async index() {
    const ctx = this.ctx;
    const users = await ctx.service.users.index();
    ctx.body = users;
    ctx.status = 200;
  }
}

module.exports = UsersController;
