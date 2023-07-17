const Service = require('egg').Service;

class LoggerService extends Service {
  /**
   * @description 日志输出
   * @param text
   * @memberof LoggerService
   */
  async text(text) {
    const { ctx } = this;
    console.log(text);
    await ctx.app.io.emit('log', text);
  }

  async error(text) {
    const { ctx } = this;
    console.error(text);
    await ctx.app.io.emit('error', text);
  }

}

module.exports = LoggerService;
