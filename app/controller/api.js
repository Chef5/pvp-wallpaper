'use strict';

const { Controller } = require('egg');

class ApiController extends Controller {
  async download() {
    const { ctx } = this;
    const { savePath, saveSize } = ctx.request.body;
    await ctx.service.pvp.task(false, { savePath, saveSize });
    ctx.status = 200;
    ctx.body = 'download';
  }
  async refreshAndDownload() {
    const { ctx } = this;
    const { savePath, saveSize } = ctx.request.body;
    await ctx.service.pvp.task(true, { savePath, saveSize });
    ctx.status = 200;
    ctx.body = 'refreshAndDownload';
  }
}

module.exports = ApiController;
