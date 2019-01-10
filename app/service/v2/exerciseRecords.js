// app/service/v2/questionsInfos.js

'use strict';

const Service = require('egg').Service;
const TableName = 'edu_exercise_record';

class ExerciseRecordsService extends Service {
  async show(row) {
    const user = await this.app.mysql.get(TableName, row);
    return user;
  }

  // get 带参数（?xx=00）
  async index(params) {
    const result = await this.app.mysql.query('SELECT a.`id` as `libId`,b.`id`,a.`libName`,a.`questNum`,b.`round`,b.`lastQuest`,b.`correctRate`,b.`answerRecord` FROM  `edu_questions_library` a LEFT JOIN  `edu_exercise_record` b ON a.`id` = b.`libId` AND b.`stuId` = ?', params.stuId);
    // 此处获取的数据会有几种可能性
    // 1 null 这种情况让controller去处理
    // 2 [{} {} {}],这是最符合期待的结果，index函数展示大量数据
    // 3 [{}]，只取到一个符合条件的数据，此时记得引用的时候要加下标
    return result;
  }

  async create(params) {
    // console.log(params);
    const result = await this.app.mysql.insert(TableName, params);
    return result;
  }

  async update(row) {
    const result = await this.app.mysql.update(TableName, row);
    return result;
  }
}

module.exports = ExerciseRecordsService;
