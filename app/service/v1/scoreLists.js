// app/service/v1/scoreLists.js

'use strict';

const Service = require('egg').Service;
const TableName = 'pf2_score_lists';

class ScoreListsService extends Service {
  async show(params) {
    const result = await this.app.mysql.get(TableName, params);
    return result;
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
  async create(params) {
    const result = await this.app.mysql.insert(TableName, params);
    return result;
  }

  async update(params) {
    const result = await this.app.mysql.query('UPDATE `pf2_score_lists` SET `sco_score` = ?, `sco_SubmitTime` = CURRENT_TIMESTAMP() WHERE `sco_id` = ?', [ params.sco_score, params.sco_id ]);
    return result;
  }
}

module.exports = ScoreListsService;
