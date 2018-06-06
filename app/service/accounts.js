/*
**  这是一个用于RESTful接口的service例子，
**  对应的controller 是 v1/accounts.js
*/

'use strict';
// app/service/user.js
const Service = require('egg').Service;
const TableName = 'think_accounts_uuid';

class AccountsService extends Service {
  async show(uid) {
    // 根据用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get(TableName, { acc_Id: uid });
    return user;
  }
  async index() {
    // 查询user表中所有记录
    const params = this.ctx.request.query;
    let accounts;
    // console.log(params);
    // const user = params.user;
    // const password = params.password;
    if (params.password !== undefined) {
      // console.log(params);
      accounts = await this.app.mysql.get(TableName, { acc_Name: params.user, acc_PassWord: params.password });
    } else {
      accounts = await this.app.mysql.select(TableName);
    }
    return accounts;
  }
}

module.exports = AccountsService;
