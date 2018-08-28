'use strict';
// app/v1/service/moduleApplyRecords.js
const Service = require('egg').Service;
const TableName = 'ta_module_apply_records';

class ModuleApplyRecordsService extends Service {
  async show(id) {
    // 根据用户 id 从数据库获取用户详细信息
    const result = await this.app.mysql.get(TableName, { id });
    // console.log(result);
    return result;
  }
  async index(params) {
    let moduleApplyRecords;
    if (params.uId !== undefined) {
      moduleApplyRecords = await this.app.mysql.select(TableName, { where: params });
    } else {
      if (params.type !== undefined) {
        moduleApplyRecords = await this.app.mysql.select(TableName, { where: params, columns: 'id' });
      } else {
        // console.log(params);
        moduleApplyRecords = await this.app.mysql.query('SELECT a.`id`, a.`uId`, a.`submitTime`, b.`realName`, b.`school`, b.`email`, b.`cellphone`, b.`department`, b.`highestDegree`, a.`type`, a.`status` FROM `ta_module_apply_records` a LEFT JOIN `pf2_accounts_informations` b ON (a.`uId` = b.`id`) WHERE a.`modId` = ?', [ parseInt(params.modId) ]);
      }
    }
    return moduleApplyRecords;
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

  async destroy(params) {
    // console.log(params);
    const result = await this.app.mysql.delete(TableName, params);
    return result;
  }
}

module.exports = ModuleApplyRecordsService;
