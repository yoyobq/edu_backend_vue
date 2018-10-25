// app/middleware/validate_handler.js
// 用于V2版本的后台安全验证

'use strict';

module.exports = () => {
  return async function validateHandler(ctx, next) {
    // console.log('validate Start');
    const authkey = ctx.request.header.authkey;
    // console.log(authkey);
    // if (authkey !== undefined) {
    //   // 计算真正的atuhkey（未完成）
    // }
    if (authkey === 'v2secret') {
      await next();
    } else {
      // 远程调用返回格式错误
      ctx.throw(403, '非法的数据访问');
    }
    // console.log('validate End');
  };
};
