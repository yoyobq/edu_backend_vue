// app/service/v1/examLists.js

'use strict';

const Service = require('egg').Service;
const TableName = 'pf2_exam_lists';

class ExamListsService extends Service {
  async show(uid) {
    // 根据用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get(TableName, { id: uid });
    return user;
  }
  async index(params) {
    let result;
    if (params !== {}) {
      result = await this.app.mysql.select(TableName, {
        where: { class_id: params.classId },
        // columns: [ 'uuid', 'id' ],
      });
    } else {
      result = await this.app.mysql.select(TableName);
    }
    return result;
  }
}

module.exports = ExamListsService;
