/*
**  这是一个用于RESTful接口的service例子，
**  对应的controller 是 v1/users.js
*/

'use strict';
// app/service/user.js
const Service = require('egg').Service;

class UsersService extends Service {
  async show(uid) {
    // 根据用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('user', { id: uid });
    return user;
  }

  async index() {
    // 查询user表中所有记录
    const users = await this.app.mysql.select('user');
    return users;
  }
}

module.exports = UsersService;
