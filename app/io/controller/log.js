'use strict';

const Controller = require('egg').Controller;

class LogController extends Controller {
  async check() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('res', 'alive');
  }
}

module.exports = LogController;
