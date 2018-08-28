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
    const user = await ctx.service.v1.users.show(userId);
    if (user !== null) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    // console.log(this.ctx.request);
    const users = await ctx.service.v1.users.index();
    if (users !== null) {
      ctx.body = users;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  }
}

module.exports = UsersController;
