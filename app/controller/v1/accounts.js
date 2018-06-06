// app/controller/accounts.js
'use strict';

const Controller = require('egg').Controller;

class AccountsController extends Controller {
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
    const user = await ctx.service.accounts.show(userId);
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
    const users = await ctx.service.accounts.index();
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

module.exports = AccountsController;
