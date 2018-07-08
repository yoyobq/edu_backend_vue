// app/service/v1/scores.js

'use strict';

const Service = require('egg').Service;
const TableName = 'pf2_exam_records';

class ScoresService extends Service {
  async show(uid) {
    // 根据用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get(TableName, { acc_Id: uid });
    return user;
  }
  async index(params) {
    let result;
    if (params !== {}) {
      result = await this.app.mysql.select(TableName, {
        where: params,
      });
    } else {
      result = await this.app.mysql.select(TableName);
    }
    return result;
  }

  async update(params) {
    const row = {
      exam_stuAnswer: params.stuAnswer,
    };
    const options = {
      where: {
        record_id: params.record_id,
      },
    };
    // console.log(row.record_id);
    const result = await this.app.mysql.update(TableName, row, options);
    return result;
  }

  async wrong(params) {
    // console.log(params);
    const result = await this.app.mysql.query('SELECT COUNT(record_id) AS `wrong` FROM `pf2_exam_records` WHERE `exam_Id` = ? AND `id` = ?  AND `exam_StuAnswer` != `exam_RealAnswer`', [ params.exam_Id, params.id ]);
    // console.log(wrongNum[0].wrongNum);
    return result;
  }
}

module.exports = ScoresService;
