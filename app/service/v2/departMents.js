// app/service/v2/departMents.js

'use strict';

const Service = require('egg').Service;
const TableName = 'edu_department';

class DepartMentsService extends Service {
  async show(row) {
    // 根据用户 id 从数据库获取用户详细信息
    console.log(row);
    const user = await this.app.mysql.get(TableName, row);
    return user;
  }

  // get 带参数（?xx=00）
  async index(params) {
    const result = await this.app.mysql.select(TableName, {
      where: params,
    });
    // 此处获取的数据会有几种可能性
    // 1 null 这种情况让controller去处理
    // 2 [{} {} {}],这是最符合期待的结果，index函数展示大量数据
    // 3 [{}]，只取到一个符合条件的数据，此时记得引用的时候要加下标
    return result;
  }
}

module.exports = DepartMentsService;
