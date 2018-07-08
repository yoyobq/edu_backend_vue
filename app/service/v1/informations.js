'use strict';
// app/v1/service/informations.js
const Service = require('egg').Service;
const TableName = 'pf2_accounts_informations';

class InformationsService extends Service {
  async show(id) {
    // 根据用户 id 从数据库获取用户详细信息
    const result = await this.app.mysql.get(TableName, { id });
    return result;
  }
  async index() {
    const params = this.ctx.request.query;
    let informations;
    if (params.password !== undefined) {
      // console.log(params);
      informations = await this.app.mysql.get(TableName, { acc_Name: params.username, acc_PassWord: params.password });
    } else {
      informations = await this.app.mysql.select(TableName);
    }
    return informations;
  }

  async update(row) {
    const result = await this.app.mysql.update(TableName, row);
    return result;
  }

  async create(params) {
    // console.log(params);
    const result = await this.app.mysql.insert(TableName, params);
    return result;
  }
}

module.exports = InformationsService;
