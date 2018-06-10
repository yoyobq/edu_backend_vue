'use strict';
// app/v1/service/accounts.js
const Service = require('egg').Service;
const TableName = 'pf2_accounts_basic_informations';

class AccountsService extends Service {
  async show(id) {
    // 根据用户 id 从数据库获取用户详细信息
    const result = await this.app.mysql.get(TableName, { id });
    return result;
  }
  async index() {
    // 查询user表中所有记录
    const params = this.ctx.request.query;
    let accounts;
    if (params.password !== undefined) {
      // console.log(params);
      accounts = await this.app.mysql.get(TableName, { acc_Name: params.username, acc_PassWord: params.password });
    } else {
      accounts = await this.app.mysql.select(TableName);
    }
    return accounts;
  }

  async update(row) {
    const result = await this.app.mysql.update(TableName, row);
    return result;
  }
}

module.exports = AccountsService;
