// app/service/v1/questions.js

'use strict';

const Service = require('egg').Service;
const TableName = 'pf2_questions';

class QuestionsService extends Service {
  async show(uid) {
    // 根据用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get(TableName, { acc_Id: uid });
    return user;
  }
  async index(params) {
    let result;
    if (params !== {}) {
      // exam_Id: '6', acc_Id: '1'
      result = await this.app.mysql.query('SELECT t2.`record_id`, t1.`quest_Title`, t1.`quest_A`, t1.`quest_B`, t1.`quest_C`, t1.`quest_D`, t1.`quest_E`, t1.`quest_F`, t1.`quest_type`, t2.`exam_StuAnswer`,t2.`exam_RealAnswer` FROM `pf2_questions` t1, `pf2_exam_records` t2 WHERE t1.`quest_Id` = t2.`que_Id` AND t2.`exam_Id` = ? AND t2.`id` = ?', [ params.exam_Id, params.acc_Id ]);
    } else {
      result = await this.app.mysql.select(TableName);
    }
    return result;
  }
}

module.exports = QuestionsService;
