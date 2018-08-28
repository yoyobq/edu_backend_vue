'use strict';
// app/v1/service/modules.js
const Service = require('egg').Service;
const TableName = 'ta_module';

class ModulesService extends Service {
  async show(id) {
    // 根据用户 id 从数据库获取用户详细信息
    const result = await this.app.mysql.get(TableName, { id });
    return result;
  }
  async index(params) {
    let modules;
    // console.log(params);
    if (params !== undefined) {
      // console.log(params);
      modules = await this.app.mysql.select(TableName, {
        where: params,
      });
      // console.log(modules);
    } else {
      modules = await this.app.mysql.select(TableName);
    }
    return modules;
  }

  async update(row) {
    const result = await this.app.mysql.update(TableName, row);
    return result;
  }

  async create(params) {
    const result = await this.app.mysql.insert(TableName, params);
    return result;
  }

  async destroy(params) {
    // console.log(params);
    const result = await this.app.mysql.delete(TableName, params);
    return result;
  }

  async getThisStuWork(uId) {
    // 显示相关uId名下，所有有申请通过（TA 或 Marker）记录的课程
    const result = await this.app.mysql.query('SELECT * FROM `ta_module` WHERE `id` IN ( SELECT DISTINCT(`modId`) FROM `ta_module_apply_records` WHERE (`status` = "pass"  OR `status` = "assigned") AND `uId` = ' + uId + ') AND STATUS = "public"');
    return result;
  }
}

module.exports = ModulesService;
