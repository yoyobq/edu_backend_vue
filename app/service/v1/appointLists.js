'use strict';
// app/v1/service/informations.js
const Service = require('egg').Service;

class AppointListsService extends Service {
  // async show(id) {
  //   // 根据用户 id 从数据库获取用户详细信息
  //   const result = await this.app.mysql.get(TableName, { id });
  //   return result;
  // }
  async index(param) {
    let users;
    if (param.apply) {
      // console.log(param.apply);
      users = await this.app.mysql.query('SELECT a.uId, c.`realName`, c.`highestDegree`, c.`email`, c.`cellphone`, b.`moduleTitle`, b.`moduleWeek`, b.`taWeekHour`, b.`markerWeekHour`, a.`type` FROM `ta_module_apply_records` a,`ta_module` b, `pf2_accounts_informations` c WHERE a.`status` = "apply" AND a.`modId` = b.`id` AND a.`uId` = c.`id`');
    } else {
      users = await this.app.mysql.query('SELECT a.uId, c.`realName`, c.`highestDegree`, c.`email`, c.`cellphone`, b.`moduleTitle`, b.`moduleWeek`, b.`taWeekHour`, b.`markerWeekHour`, a.`type` FROM `ta_module_apply_records` a,`ta_module` b, `pf2_accounts_informations` c WHERE (a.`status` = "pass" or a.`status` = "assigned") AND a.`modId` = b.`id` AND a.`uId` = c.`id`');
    }
    return users;
  }
}

module.exports = AppointListsService;
