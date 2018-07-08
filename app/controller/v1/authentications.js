// app/v1/controller/authentications.js
// 用于获取用户登录时的验证信息
'use strict';

const Controller = require('egg').Controller;
const UUID = require('node-uuid');

class AuthenticationsController extends Controller {

  async show() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.service.authentications.v1.show(userId);
    if (user !== null) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  }

  async index() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const params = ctx.query;
    const result = await ctx.service.v1.authentications.index(params);

    // 注意这条判断，比较容易写错 [] 不是 null，也不是 undefined
    if (result[0] !== undefined) {
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.body = {
        error: 'NOT FOUND',
        // 在egg官方文档里，detail给了个对象数组[{  }]，个人认为不存在数组的必要
        // 因此把他简化成了一个对象 {}
        detail: { message: '用户不存在或密码有误', field: '', code: '' },
      };
      ctx.status = 404;
    }
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      uuid: UUID.v1(),
      username: ctx.query.username,
      password: ctx.query.password,
    };
    // 表authentications内添加数据
    const result = await ctx.service.v1.authentications.create(params);
    if (result.affectedRows) {
      // console.log(result.insertId);
      const newAccount = {
        id: result.insertId,
        avatarPath: 'avatar' + Math.floor(Math.random() * 6 + 1) + '.jpg',
      };
      // 注意，换表了 表accounts
      const result2 = await ctx.service.v1.accounts.create(newAccount);
      if (result2.affectedRows) {
        const newInfo = {
          id: result2.insertId,
        };
        const result3 = await ctx.service.v1.informations.create(newInfo);
        if (result3.affectedRows) {
          console.log(result3);
          ctx.body = result3;
          ctx.status = 201;
        } else {
          ctx.status = 500;
        }
      } else {
        ctx.status = 500;
      }
    } else {
      ctx.body = {
        error: 'CREATE FAILURE',
        detail: { message: '服务器内部错误' },
      };
      ctx.status = 500;
    }
  }
}

module.exports = AuthenticationsController;
